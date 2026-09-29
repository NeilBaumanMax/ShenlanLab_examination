# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are first-year university students completing a technology department recruitment challenge on their own computers. Organizers prepare the challenge and review the files students choose to submit.

## Product Purpose

The app guides students through ten AI, agent, GitHub, and practical-building tasks. It keeps task instructions, learning resources, answers, and attachments together, then saves the student's work in a local folder suitable for manual submission.

## Positioning

The product combines a sequential learning route with freely accessible tasks and a per-question local answer folder, so students can learn and document their work in one place without creating an online account or uploading answers.

## Operating Context

Students receive the app as a compressed folder, run it locally with Python, and use a browser on the same computer. They may consult external resources or AI tools, save progress, then manually compress their personal answer folder and send it to organizers by QQ email. Organizers review submissions outside the app.

## Capabilities and Constraints

- The app presents four stages and ten tasks; students may open tasks in any order.
- Answers and attachments are stored on the student's computer and can be restored from the same extracted app folder.
- The local service binds only to `127.0.0.1`; it does not upload student information, answers, or attachments.
- There is no administrator console, online inbox, automated scoring, admission decision, telemetry, cloud sync, or automatic email submission.
- The student prepares Python to run the packaged app. Node.js is a development dependency only.
- The product accepts a GitHub link or source ZIP for the practical project task.

## Brand Commitments

The supplied brief names the product “深蓝科技部 AI Agent 闯关答题 App” and asks for a blue-led technology look, bright readable task areas, and an interface that does not become a complicated game. This record is compiled from the supplied construction brief; no separate brand assets were provided.

## Evidence on Hand

The repository contains the supplied construction handoff brief and the authored task content in `content/questions.json`. No testimonials, performance claims, user data, logos, or external brand assets were supplied; the interface must not invent them.

## Product Principles

- Make the next learning task and its expectations easy to understand.
- Keep all tasks available; progress is guidance, not a gate.
- Treat local saving and the student's control of their files as core product behavior.
- Encourage students to inspect and explain AI-assisted work.
- Keep submission manual and transparent.
