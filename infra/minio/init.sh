#!/bin/sh
set -e

echo "🔧 MinIO Initialization Script Starting..."
echo "   Endpoint: $MINIO_ENDPOINT"
echo "   Bucket: $MINIO_BUCKET"
echo "   User: $MINIO_ROOT_USER"

echo "⏳ Waiting for MinIO to be ready..."
MAX_RETRIES=30
RETRY_COUNT=0

until mc alias set local "$MINIO_ENDPOINT" "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD" 2>/dev/null; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "❌ Failed to connect to MinIO after $MAX_RETRIES attempts"
    exit 1
  fi
  echo "   Attempt $RETRY_COUNT/$MAX_RETRIES - Retrying in 2s..."
  sleep 2
done

echo "✅ MinIO is reachable!"

# Create main bucket
echo "📦 Creating bucket: $MINIO_BUCKET"
if mc mb --ignore-existing local/"$MINIO_BUCKET"; then
  echo "✅ Bucket created/verified: $MINIO_BUCKET"
else
  echo "❌ Failed to create bucket: $MINIO_BUCKET"
  exit 1
fi

# Set bucket to public (optional - pour les images publiques)
echo "🔓 Setting bucket policy to public download..."
mc anonymous set download local/"$MINIO_BUCKET"

echo "📁 Uploading default files..."

# Upload default images
if [ -d /defaults/recipe ] && [ "$(ls -A /defaults/recipe)" ]; then
  echo "   Uploading recipe defaults..."
  mc cp --recursive /defaults/recipe/ local/"$MINIO_BUCKET"/recipe/
  echo "   ✅ Recipe defaults uploaded"
else
  echo "   ⚠️  No recipe defaults found or directory empty"
fi

if [ -d /defaults/utensil ] && [ "$(ls -A /defaults/utensil)" ]; then
  echo "   Uploading utensil defaults..."
  mc cp --recursive /defaults/utensil/ local/"$MINIO_BUCKET"/utensil/
  echo "   ✅ Utensil defaults uploaded"
else
  echo "   ⚠️  No utensil defaults found or directory empty"
fi

if [ -d /defaults/ingredient ] && [ "$(ls -A /defaults/ingredient)" ]; then
  echo "   Uploading ingredient defaults..."
  mc cp --recursive /defaults/ingredient/ local/"$MINIO_BUCKET"/ingredient/
  echo "   ✅ Ingredient defaults uploaded"
else
  echo "   ⚠️  No ingredient defaults found or directory empty"
fi

if [ -d /defaults/user ] && [ "$(ls -A /defaults/user)" ]; then
  echo "   Uploading user defaults..."
  mc cp --recursive /defaults/user/ local/"$MINIO_BUCKET"/users/
  echo "   ✅ User defaults uploaded"
else
  echo "   ⚠️  No user defaults found or directory empty"
fi

echo ""
echo "🎉 MinIO initialization completed successfully!"
echo "📊 Bucket contents:"
mc ls local/"$MINIO_BUCKET"/ || echo "   (empty or not accessible)"