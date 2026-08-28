#!/bin/bash
# Download Figma assets to local files
# Run this script to save assets locally before the URLs expire (~7 days)

cd "$(dirname "$0")"

echo "Downloading mockup images..."
mkdir -p assets/images assets/icons

curl -L "https://www.figma.com/api/mcp/asset/03f80a4d-f05a-434f-b542-d45a805e747b.png" -o assets/images/rocket-connect-mockup.png
curl -L "https://www.figma.com/api/mcp/asset/0dc72ca5-1648-4e4f-96d8-5e858da7cecc.png" -o assets/images/origins-mockup.png
curl -L "https://www.figma.com/api/mcp/asset/867a9fe2-d552-4b9a-b560-72fb75582e77.png" -o assets/images/citi-mockup.png
curl -L "https://www.figma.com/api/mcp/asset/867a9fe2-d552-4b9a-b560-72fb75582e77.png" -o assets/images/mr-cooper-mockup.png

echo "Downloading logos..."
curl -L "https://www.figma.com/api/mcp/asset/d8410ab1-eec7-4f09-bdfb-ee57e894b399.svg" -o assets/icons/logo.svg
curl -L "https://www.figma.com/api/mcp/asset/f27886dd-cf1e-453c-a577-92a66c0949df.svg" -o assets/icons/rocket-mortgage-logo.svg
curl -L "https://www.figma.com/api/mcp/asset/a0601c80-c91e-49e7-9d22-65761b2fce36.svg" -o assets/icons/citi-logo.svg
curl -L "https://www.figma.com/api/mcp/asset/18c63e40-0d0c-4912-bf97-5edebe49314e.png" -o assets/icons/mr-cooper-logo.png

echo ""
echo "✓ Assets downloaded to assets/ folder"
echo ""
echo "After downloading, update index.html to use local paths:"
echo "  - Replace Figma URLs with local paths (e.g., assets/images/rocket-connect-mockup.png)"
