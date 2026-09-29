# Git 提交树与分支指南

Git 在本机记录项目快照；GitHub 是可选的远端仓库。两者不是同一个位置。常见文件流向如下：

```text
编辑文件
工作区 ── git add ──> 暂存区 ── git commit ──> 本地仓库
                                              │
                          git push              ↓
                                        GitHub 远端

GitHub 远端 ── git fetch ──> 远端跟踪记录 ── git merge / git pull ──> 本地分支
```

- **工作区**：你正在查看和编辑的文件。
- **暂存区**：下一次提交要包含的文件快照。可以只暂存一部分改动。
- **本地仓库**：已经提交的历史，不依赖网络也能查看。
- **远端仓库**：托管在 GitHub 等服务上的另一份仓库。`push` 上传本地提交；`fetch` 下载远端记录但不自动合并；`pull` 通常是获取并整合远端更新。

## 提交历史和分支

分支是指向提交的可移动标签。创建功能分支后，可以在不直接改动 `main` 的情况下工作，再把验证通过的提交合并回来：

```text
                 C──D  功能分支
                /     \
...──A──B───────┴──M── main
```

`M` 表示合并提交的一种常见画法。快进合并也可能不产生单独的 `M`；重点是功能分支上的提交最终被纳入目标分支。

## 练习命令

```text
git status
git add README.md
git diff --staged
git commit -m "docs: explain project setup"
git log --oneline --graph --all
git remote -v
```

先用 `git status` 看清当前改动，再选择要暂存的文件。提交前检查 `git diff --staged`，确认密钥、密码、私人数据和不需要的生成文件没有进入提交。

GitHub 入门：[创建仓库](https://docs.github.com/en/get-started/start-your-journey/creating-a-repository-for-your-project-on-github)、[通过 SSH 连接](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)。完整参考：[Pro Git 中文版](https://git-scm.com/book/zh/v2)。
