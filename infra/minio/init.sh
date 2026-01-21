#!/bin/sh
set -e

echo "🔧 MinIO Initialization Script Starting..."
echo "   Endpoint: $MINIO_ENDPOINT"
echo "   Bucket: $MINIO_BUCKET"
echo "   User: $MINIO_ROOT_USER"

# Test de connectivité basique
echo "🔍 Testing MinIO connectivity..."
if ! curl -f "$MINIO_ENDPOINT/minio/health/ready" 2>/dev/null; then
  echo "⚠️  MinIO health endpoint not responding"
fi

echo "⏳ Waiting for MinIO to be ready..."
MAX_RETRIES=60  # Augmenté à 60 (2 minutes)
RETRY_COUNT=0

until mc alias set local "$MINIO_ENDPOINT" "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD" 2>&1; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "❌ Failed to connect to MinIO after $MAX_RETRIES attempts"
    echo "🔍 Debug info:"
    echo "   Endpoint: $MINIO_ENDPOINT"
    echo "   User length: ${#MINIO_ROOT_USER}"
    echo "   Password length: ${#MINIO_ROOT_PASSWORD}"
    exit 1
  fi
  echo "   Attempt $RETRY_COUNT/$MAX_RETRIES - Retrying in 2s..."
  sleep 2
done

echo "✅ MinIO is reachable!"

# Vérifier que l'alias fonctionne
echo "🔍 Testing MinIO connection..."
if ! mc ls local/ 2>&1; then
  echo "❌ Cannot list buckets - connection issue"
  exit 1
fi

# Create main bucket
echo "📦 Creating bucket: $MINIO_BUCKET"
if mc mb --ignore-existing local/"$MINIO_BUCKET" 2>&1; then
  echo "✅ Bucket created/verified: $MINIO_BUCKET"
else
  echo "❌ Failed to create bucket: $MINIO_BUCKET"
  exit 1
fi

# Set bucket to public
echo "🔓 Setting bucket policy to public download..."
if mc anonymous set download local/"$MINIO_BUCKET" 2>&1; then
  echo "✅ Bucket policy set successfully"
else
  echo "⚠️  Failed to set bucket policy (non-critical)"
fi

echo "📁 Uploading default files..."

# Upload default images
if [ -d /defaults/recipe ] && [ "$(ls -A /defaults/recipe 2>/dev/null)" ]; then
  echo "   Uploading recipe defaults..."
  mc cp --recursive /defaults/recipe/ local/"$MINIO_BUCKET"/recipe/ 2>&1
  echo "   ✅ Recipe defaults uploaded"
else
  echo "   ⚠️  No recipe defaults found or directory empty"
fi

if [ -d /defaults/utensil ] && [ "$(ls -A /defaults/utensil 2>/dev/null)" ]; then
  echo "   Uploading utensil defaults..."
  mc cp --recursive /defaults/utensil/ local/"$MINIO_BUCKET"/utensil/ 2>&1
  echo "   ✅ Utensil defaults uploaded"
else
  echo "   ⚠️  No utensil defaults found or directory empty"
fi

if [ -d /defaults/ingredient ] && [ "$(ls -A /defaults/ingredient 2>/dev/null)" ]; then
  echo "   Uploading ingredient defaults..."
  mc cp --recursive /defaults/ingredient/ local/"$MINIO_BUCKET"/ingredient/ 2>&1
  echo "   ✅ Ingredient defaults uploaded"
else
  echo "   ⚠️  No ingredient defaults found or directory empty"
fi

if [ -d /defaults/user ] && [ "$(ls -A /defaults/user 2>/dev/null)" ]; then
  echo "   Uploading user defaults..."
  mc cp --recursive /defaults/user/ local/"$MINIO_BUCKET"/users/ 2>&1
  echo "   ✅ User defaults uploaded"
else
  echo "   ⚠️  No user defaults found or directory empty"
fi

echo ""
echo "🎉 MinIO initialization completed successfully!"
echo "📊 Bucket contents:"
mc ls local/"$MINIO_BUCKET"/ 2>&1 || echo "   (empty or not accessible)"

echo "✅ Init script finished - keeping container alive for 5 seconds..."
sleep 5