export interface StudentProfile {
  name: string;
  studentId: string;
  directoryName: string;
}

export interface StoredAnswer {
  [field: string]: string;
}

export interface ProfileResponse {
  profile: StudentProfile;
  answers: Record<string, StoredAnswer>;
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

export function saveAnswer(
  profile: StudentProfile,
  questionId: string,
  fields: StoredAnswer,
  keepalive = false,
): Promise<{ ok: boolean; questionId: string; savedAt: string }> {
  return request(`/api/answers/${encodeURIComponent(questionId)}`, {
    method: "PUT",
    keepalive,
    body: JSON.stringify({
      name: profile.name,
      studentId: profile.studentId,
      fields,
    }),
  });
}
