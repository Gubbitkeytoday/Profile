# 🔒 Security Policy

## Supported Versions

Security updates and vulnerability patches are applied directly to the active production branch:

| Version / Branch | Supported |
| :--- | :--- |
| `master` (Production) | :white_check_mark: |
| Legacy Builds | :x: |

---

## Reporting a Vulnerability

If you discover a security vulnerability, please send an email to **Wongsathorn Chapseethong** at:

📧 **[pushilkun@gmail.com](mailto:pushilkun@gmail.com)**

Please include:
1. Description of the vulnerability.
2. Steps to reproduce or proof-of-concept payload.
3. Affected components, browsers, or endpoints.

We will acknowledge receipt of your report within 48 hours and provide an estimated timeline for remediation.

---

## Security Practices & Hardening Standards

- **Zero Inline Script Execution:** All scripts are bundled cleanly and execute within scope.
- **Strict Content Isolation:** External links declare `rel="noopener noreferrer"`.
- **Privacy Protection:** No third-party tracking beacons, tracking pixels, or intrusive analytics cookies.
