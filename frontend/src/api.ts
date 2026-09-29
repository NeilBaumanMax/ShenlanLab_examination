export interface StudentProfile {
  name: string;
  studentId: string;
  directoryName: string;
}

export interface StoredAnswer {
  [field: string]: string;
}

export interface StoredAttachment {
  name: string;
  size: number;
}

export interface SubmissionFile {
  name: string;
  size: number;
}

export interface SubmissionQuestionDirectory {
  id: string;
  directoryName: string;
  files: SubmissionFile[];
}

export interface SubmissionFileTree {
  directoryName: string;
  rootFiles: SubmissionFile[];
  questions: SubmissionQuestionDirectory[];
}

export interface ProfileResponse {
  profile: StudentProfile;
  answers: Record<string, StoredAnswer>;
  attachments: Record<string, StoredAttachment[]>;
  fileTree: SubmissionFileTree;
}

interface ApiError {
  error?: string;
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
    });
  } catch {
    throw new Error("无法连接本机服务。请确认启动窗口仍在运行，再刷新页面。");
  }

  const payload = (await response.json().catch(() => ({}))) as T & ApiError;
  if (!response.ok) {
    throw new Error(payload.error ?? "本机保存失败，请稍后重试。");
  }
  return payload;
}

export function createProfile(name: string, studentId: string): Promise<ProfileResponse> {
  return request<ProfileResponse>("/api/profile", {
    method: "POST",
    body: JSON.stringify({ name, studentId }),
  });
}

export function getExistingProfiles(): Promise<{ profiles: StudentProfile[] }> {
  return request("/api/profiles", { method: "GET" });
}

export function saveAnswer(
  profile: StudentProfile,
  questionId: string,
  fields: StoredAnswer,
): Promise<{ ok: boolean; questionId: string; savedAt: string }> {
  return request(`/api/answers/${encodeURIComponent(questionId)}`, {
    method: "PUT",
    body: JSON.stringify({
      name: profile.name,
      studentId: profile.studentId,
      fields,
    }),
  });
}

export async function uploadAttachment(
  profile: StudentProfile,
  questionId: string,
  file: File,
): Promise<StoredAttachment> {
  const form = new FormData();
  form.append("name", profile.name);
  form.append("studentId", profile.studentId);
  form.append("file", file, file.name);
  let response: Response;
  try {
    response = await fetch(`/api/attachments/${encodeURIComponent(questionId)}`, {
      method: "POST",
      body: form,
    });
  } catch {
    throw new Error("无法连接本机服务。请确认启动窗口仍在运行，再重试。");
  }
  const payload = (await response.json().catch(() => ({}))) as {
    attachment?: StoredAttachment;
    error?: string;
  };
  if (!response.ok || !payload.attachment) {
    throw new Error(payload.error ?? "附件保存失败，请重试。");
  }
  return payload.attachment;
}

export function deleteSubmissionFile(
  profile: StudentProfile,
  questionId: string,
  filename: string,
): Promise<{ ok: boolean; questionId: string; filename: string }> {
  return request(`/api/files/${encodeURIComponent(questionId)}`, {
    method: "DELETE",
    body: JSON.stringify({
      name: profile.name,
      studentId: profile.studentId,
      filename,
    }),
  });
}

export function getSubmissionFileTree(profile: StudentProfile): Promise<{ fileTree: SubmissionFileTree }> {
  const query = new URLSearchParams({ name: profile.name, studentId: profile.studentId });
  return request(`/api/submission/files?${query.toString()}`, { method: "GET" });
}

export function openSubmissionDirectory(profile: StudentProfile): Promise<{ ok: boolean; directoryName: string }> {
  return request("/api/submission/open", {
    method: "POST",
    body: JSON.stringify({ name: profile.name, studentId: profile.studentId }),
  });
}
