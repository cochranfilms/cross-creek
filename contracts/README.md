# Signed Contracts Directory

This directory stores signed Cross Creek Realty contracts as PDF files.

## How It Works

1. **Client signs contract** in `contract.html`
2. **PDF is generated** automatically
3. **Emails are sent** to both client and admin
4. **Admin email contains download link** to the signed contract

## File Naming Convention

Contracts are named using this format:
```
CrossCreek_Contract_[ClientName]_[ContractID].pdf
```

Example:
```
CrossCreek_Contract_Damita_Davis_CCR-1755815290132.pdf
```

## Current Setup

- ✅ **Contracts directory** created in GitHub
- ✅ **Admin email template** configured
- ✅ **Download links** point to GitHub raw files
- ✅ **PDF generation** integrated

## Next Steps

When a contract is signed:
1. The system will generate a PDF
2. You'll receive an admin email with a download link
3. The download link will point to: `https://raw.githubusercontent.com/cochranfilms/cross-creek/main/contracts/[filename].pdf`

## Manual Upload (Current Method)

For now, the system will:
1. Generate the PDF
2. Log the filename it should have
3. You manually upload the PDF to this directory

## Future Enhancement

We can automate the GitHub upload using GitHub's API if needed.

## Directory Structure

```
contracts/
├── README.md (this file)
├── sample-contract.md (placeholder)
└── [signed contracts will go here]
```
