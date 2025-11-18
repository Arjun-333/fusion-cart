#!/bin/bash

# Copy components/Recommendations.js
cp -v FusionCart_BackendIntegration/components/Recommendations.js src/components/

# Copy utils/api.js
mkdir -p src/utils
cp -v FusionCart_BackendIntegration/utils/api.js src/utils/

# Replace pages/index.js
cp -v FusionCart_BackendIntegration/pages/index.js src/pages/index.js

echo "✅ Backend integration patch applied successfully."