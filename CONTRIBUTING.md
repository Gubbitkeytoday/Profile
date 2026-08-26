# 🤝 Contributing Guidelines

Thank you for your interest in contributing to the **Wongsathorn Chapseethong Engineering Portfolio** repository.

---

## 📜 Code of Conduct

All contributors are expected to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md). Please report any unacceptable behavior to [pushilkun@gmail.com](mailto:pushilkun@gmail.com).

---

## 🛠️ Development Workflow

1. **Fork or Branch:**
   Create a dedicated feature branch from `master`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Commit Message Standards (Conventional Commits):**
   Please follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
   - `feat:` A new feature or project case study.
   - `fix:` A bug fix, CSS alignment, or broken asset path.
   - `docs:` Documentation improvements.
   - `style:` Formatting or design token adjustments.
   - `refactor:` Code restructuring without changing functionality.
   - `perf:` Performance and asset optimization.

3. **Pre-flight QA Testing:**
   Before creating a pull request, ensure syntax and accessibility checks pass:
   ```bash
   node -c assets/js/main.js
   node -c assets/js/projects.js
   ```

4. **Submit Pull Request:**
   Open a pull request targeting the `master` branch with a clear description of the changes.

---

<div align="center">
<sub>Thank you for maintaining high engineering standards.</sub>
</div>
