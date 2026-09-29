---
name: 深蓝科技部 AI Agent 闯关答题 App
description: A local learning route for AI Agent recruitment challenges.
colors:
  navy: "#123A70"
  navy-deep: "#0C2B52"
  blue: "#356AA7"
  blue-wash: "#EAF2FB"
  canvas: "#F4F7FB"
  paper: "#FFFFFF"
  ink: "#18304F"
  muted: "#5A6F89"
  line: "#DCE6F1"
  success: "#237A57"
  warning: "#9B6411"
  danger: "#B43D46"
typography:
  body:
    fontFamily: "PingFang SC, Microsoft YaHei, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "PingFang SC, Microsoft YaHei, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    height: "44px"
---

# Design System: 深蓝科技部 AI Agent 闯关答题 App

## Overview

**Creative North Star: The Local Learning Workbench.**

This is a focused working surface for students reading a task, preparing an answer, and explicitly saving it locally. The atmosphere comes from a bright, quiet work area with blue reserved for primary actions and active states; it does not turn every task into a game screen.

Keep the task, the organizer's expectations, and the answer area in a predictable order. Use ordinary browser controls and clear local-save feedback so the interface recedes while the student works.

**Key Characteristics:**

- Bright reading surface with a compact, freely navigable ten-question answer card.
- Content-led layout with the question and answer as the primary column, and progress plus the saved-file tree in a supporting column.
- Familiar controls and clear submitted, changed, and unsaved-draft feedback.

## Colors

The palette pairs a deep blue frame with high-contrast white and pale blue surfaces; semantic colors are reserved for status.

### Primary
- **Deep Route Blue** (`#123A70`): Brand and primary action color.
- **Clear Signal Blue** (`#356AA7`): Links, focus, and selected navigation details.

### Neutral
- **Reading Canvas** (`#F4F7FB`): Main page background.
- **Paper White** (`#FFFFFF`): Task and form surfaces.
- **Working Ink** (`#18304F`): Primary text.
- **Secondary Ink** (`#5A6F89`): Supporting text on light surfaces.
- **Quiet Line** (`#DCE6F1`): Separators and control borders.

### Named Rules
**The Blue Means Location Rule.** Use blue for navigation, links, primary actions, and active or saved states; keep long reading areas white or near-white.

## Typography

**Body Font:** `PingFang SC, Microsoft YaHei, -apple-system, BlinkMacSystemFont, sans-serif`
**Character:** A system-first sans stack keeps the interface fast, legible, and familiar across student computers.

### Hierarchy
- **Page title** (700, 32px, 1.2): Main route or selected task title.
- **Section title** (650, 20px, 1.35): Task-card sections and panels.
- **Body** (400, 16px, 1.6): Instructions and answers; keep prose near 65–75ch when layout permits.
- **Label** (600, 13px, 1.4): Form labels, status, and compact metadata.

## Layout

On wide screens, keep the question and answer workspace as the main column and place the answer card and live saved-file tree in a supporting right column. On narrow screens, let the student switch between the task and supporting panels; keep the answer card above the file tree in the supporting panel and never force horizontal scrolling. The identity form is the first screen before entering the tasks.

Use a compact 4/8/16/24/32px spacing rhythm. Put more space before a new section heading than after it. Keep task instructions, organizer expectations, assessment focus, expected outcome, resources, and answer controls visibly distinct.

## Elevation & Depth

Use Liquid Glass as functional chrome, not as a decorative filter: the sticky top bar and supporting answer/file panels may use translucent, saturated blur with an offset shadow so content can move beneath them. Keep task instructions, answer fields, file rows, and long-form reading on opaque high-contrast surfaces. Never stack translucent layers over one another. Where `backdrop-filter` is unavailable or transparency reduction is requested, fall back to a near-opaque surface with a defined edge.

## Shapes

Use 14–18px corners for work panels, 12–14px for buttons and fields, and up to 24px for the identity surface. Keep controls tactile and consistent; pills are for compact status labels and segmented controls only.

## Components

### Buttons
- **Primary:** Deep blue fill, white text, 12px corners, 10px by 16px padding; immediate subtle press feedback.
- **Hover / Focus:** Deepen the fill for hover; show a visible keyboard focus ring without shifting layout.
- **Secondary:** White or pale blue fill with a quiet line; preserve the same shape and height.

### Cards / Containers
- **Corner Style:** 16px on task surfaces; compact floating chrome may use a 20px radius.
- **Background:** Opaque paper white on task and answer surfaces; translucent glass only on structural chrome and supporting panels.
- **Border:** Quiet translucent edge on glass; use one clear separation method and a soft offset shadow, not a heavy border-plus-shadow stack.
- **Internal Padding:** 24px desktop, 16px narrow screens.

### Inputs / Fields
- **Style:** White fill, quiet line, 12px corners, 44px minimum height.
- **Focus:** Clear blue outline with a small separation from the field edge.
- **Error / Disabled:** Explain recovery in text; do not rely on color alone.

### Navigation
- Keep all four stages and ten tasks available.
- Mark current, answered, and unanswered tasks distinctly without implying a lock.
- Make all ten question numbers directly clickable; show empty, submitted, and changed-but-unsubmitted status.
- On narrow screens, use the task/supporting-panel switch while retaining direct question navigation.

## Do's and Don'ts

### Do:
- **Do** make unsubmitted draft, submitted, and failed states explicit beside the work they describe; only an explicit submit action writes changes.
- **Do** keep the full task expectations and answer affordances visible in the reading flow.
- **Do** use semantic colors consistently for success, warning, and error.

### Don't:
- **Don't** lock a task because an earlier task is incomplete.
- **Don't** use external fonts, scripts, icon services, or decorative animation that requires a network connection.
- **Don't** imply that student information or answers are uploaded or scored online.
