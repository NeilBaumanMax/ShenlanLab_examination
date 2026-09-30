# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are first-year university students completing a technology department recruitment challenge on their own computers. Organizers prepare the challenge and review the files students choose to submit.

## Product Purpose

The app guides students through eleven AI, Agent, GitHub, and practical-building tasks grouped into three learning stages. It keeps task instructions, learning resources, answers, and attachments together, then saves the student's work in a local folder suitable for manual submission.

## Positioning

The product combines a sequential learning route with freely accessible tasks and a per-question local answer folder, so students can learn and document their work in one place without creating an online account or uploading answers.

## Operating Context

Students receive the app as a compressed folder, run it locally with Python, and use a browser on the same computer. They may consult external resources or AI tools, save progress, then manually compress their personal answer folder and send it to organizers by QQ email. Organizers review submissions outside the app.

## Capabilities and Constraints

- The app presents three stages and eleven tasks; students may open tasks in any order.
- Answers and attachments are stored on the student's computer and can be restored from the same extracted app folder.
- On launch, the app scans existing local submission folders. Returning students can select an existing `姓名_学号` profile and enter the tasks directly; new students, or students choosing another identity, enter their name and student ID before continuing.
- The local answer folder is named `姓名_学号`, and the saved identity remains editable.
- Students explicitly submit each question. They can edit and resubmit to replace that question's text files, or delete submitted files; unsubmitted edits remain only in the current page session.
- Each question has its own folder. Answers and GitHub links are plain `.txt` files, attachments remain in their original formats, and a live file tree exposes saved files and the folder-opening action.
- An eleven-question answer card supports free navigation and distinguishes empty, submitted, and changed-but-unsubmitted work; questions are never locked.
- The local service binds only to `127.0.0.1`; it does not upload student information, answers, or attachments.
- There is no administrator console, online inbox, automated scoring, admission decision, telemetry, cloud sync, or automatic email submission.
- The student prepares Python to run the packaged app. Node.js is a development dependency only.
- The product accepts a GitHub link or source ZIP for the practical project task.

## Brand Commitments

The product is named “深蓝科技部 AI Agent 应用考核”. It uses a deep technology-blue scenic background, translucent glass work surfaces, and high-contrast reading areas without turning the assessment into a game. This record is compiled from the supplied construction brief; no separate brand assets were provided.

## Evidence on Hand

The repository contains the supplied construction handoff brief, the authored long-form task content in `content/latest-exam.md`, and task metadata in `content/questions.json`. No testimonials, performance claims, user data, logos, or external brand assets were supplied; the interface must not invent them.

## Product Principles

- Make the next learning task and its expectations easy to understand.
- Keep all tasks available; progress is guidance, not a gate.
- Treat local saving and the student's control of their files as core product behavior.
- Encourage students to inspect and explain AI-assisted work.
- Keep submission manual and transparent.
