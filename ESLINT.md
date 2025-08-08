# ESLint Configuration Guide

This guide explains how to handle ESLint rules and resolve build issues in the KonfQ project.

## 🛠 Current ESLint Configuration

### Configuration Files

- **`eslint.config.mjs`** - Main ESLint configuration (ES modules)
- **`next.config.js`** - Next.js build configuration with ESLint settings

### Key Rules Set to Warn (Not Error)

```javascript
{
  // TypeScript rules (set to warn instead of error)
  '@typescript-eslint/ban-ts-comment': 'warn',
  '@typescript-eslint/no-empty-object-type': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-unused-vars': 'warn',
  
  // Disable problematic rules that can break builds
  '@typescript-eslint/no-empty-interface': 'off',
  '@typescript-eslint/no-inferrable-types': 'off',
  
  // React rules (set to warn)
  'react-hooks/exhaustive-deps': 'warn',
  'react/no-unescaped-entities': 'warn',
  'react/display-name': 'off',
  
  // Next.js rules (disable problematic ones)
  '@next/next/no-html-link-for-pages': 'off',
  '@next/next/no-img-element': 'warn',
}
```

## 🚫 Disabling ESLint Rules

### Method 1: In Configuration File (Recommended)

Add rules to `eslint.config.mjs`:

```javascript
{
  rules: {
    'rule-name': 'off',           // Disable completely
    'rule-name': 'warn',          // Show as warning
    'rule-name': 'error',         // Show as error (default)
  },
}
```

### Method 2: Inline Comments

```javascript
// Disable for next line
// eslint-disable-next-line rule-name
const problematicCode = something();

// Disable for entire file
/* eslint-disable rule-name */

// Disable multiple rules
/* eslint-disable rule-name, another-rule */
```

### Method 3: Per File

```javascript
// At the top of file
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
```

## 🔧 Common Problematic Rules

### TypeScript Rules

```javascript
// Often cause build failures
'@typescript-eslint/no-explicit-any': 'warn',
'@typescript-eslint/no-unused-vars': 'warn',
'@typescript-eslint/ban-ts-comment': 'warn',
'@typescript-eslint/no-empty-interface': 'off',
'@typescript-eslint/prefer-as-const': 'warn',
```

### React/Next.js Rules

```javascript
// Common issues
'react-hooks/exhaustive-deps': 'warn',
'react/no-unescaped-entities': 'warn',
'@next/next/no-img-element': 'warn',
'@next/next/no-html-link-for-pages': 'off',
```

### Import Rules

```javascript
// Module resolution issues
'import/no-unresolved': 'off',
'import/no-anonymous-default-export': 'warn',
```

## 🏗️ Build-Time Configuration

### In `next.config.js`

```javascript
const nextConfig = {
  eslint: {
    // Ignore ESLint errors during build (use carefully!)
    ignoreDuringBuilds: false, // Set to true to ignore all errors
    
    // Custom directories to lint
    dirs: ['src', 'pages', 'components', 'lib', 'utils'],
  },
  
  typescript: {
    // Ignore TypeScript errors during build (use carefully!)
    ignoreBuildErrors: false, // Set to true to ignore type errors
  },
}
```

## 🛡️ Emergency Build Fixes

### If Build is Completely Broken

1. **Quick fix for deployment**:
   ```javascript
   // next.config.js
   eslint: {
     ignoreDuringBuilds: true, // ⚠️ Temporary only!
   }
   ```

2. **Disable specific directories**:
   ```javascript
   // eslint.config.mjs
   {
     ignores: [
       '.next/',
       'node_modules/',
       'out/',
       'dist/',
       '**/*.generated.*', // Generated files
     ],
   }
   ```

3. **Disable in package.json scripts**:
   ```json
   {
     "scripts": {
       "build": "next build --no-lint", // Skip linting entirely
       "lint": "next lint --quiet" // Show only errors
     }
   }
   ```

## 📋 Rule Categories

### Safe to Disable (Won't Break Code)
```javascript
'react/display-name': 'off',
'@next/next/no-html-link-for-pages': 'off',
'import/no-anonymous-default-export': 'off',
'@typescript-eslint/no-empty-interface': 'off',
```

### Set to Warning (Show but Don't Break Build)
```javascript
'@typescript-eslint/no-explicit-any': 'warn',
'@typescript-eslint/no-unused-vars': 'warn',
'react-hooks/exhaustive-deps': 'warn',
'no-console': 'warn',
```

### Keep as Error (Important for Code Quality)
```javascript
'react-hooks/rules-of-hooks': 'error',
'no-debugger': 'error',
'@typescript-eslint/no-non-null-assertion': 'error',
```

## 🎯 Project-Specific Configurations

### For PayloadCMS Projects

```javascript
{
  rules: {
    // PayloadCMS often uses any types in config
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // Collection configs may have empty interfaces
    '@typescript-eslint/no-empty-interface': 'off',
    
    // Server actions may not use all parameters
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
  }
}
```

### For Next.js App Router

```javascript
{
  rules: {
    // App router may have components without display names
    'react/display-name': 'off',
    
    // Page components may not use all props
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^(props|params|searchParams)$',
    }],
  }
}
```

## 🔄 Environment-Specific Rules

### Development vs Production

```javascript
// eslint.config.mjs
const eslintConfig = [
  // ... base config
  ...(process.env.NODE_ENV === 'development' ? [{
    rules: {
      'no-console': 'warn', // Allow console in dev
      'no-debugger': 'warn', // Allow debugger in dev
    }
  }] : [{
    rules: {
      'no-console': 'error', // Block console in prod
      'no-debugger': 'error', // Block debugger in prod
    }
  }])
]
```

## 🚀 Recommended Settings for Railway/Production

```javascript
// For production builds that must succeed
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Keep linting
    dirs: ['src'], // Only lint main source
  },
  
  // In eslint.config.mjs - make most rules warnings
  rules: {
    // Convert errors to warnings for build stability
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Keep critical errors as errors
    'react-hooks/rules-of-hooks': 'error',
    'no-undef': 'error',
  }
}
```

## 🛠️ Debugging ESLint Issues

### Check Current Rules
```bash
# See which rules are failing
npx eslint . --ext .ts,.tsx --no-fix

# Show only errors (not warnings)
npx eslint . --ext .ts,.tsx --quiet

# Fix auto-fixable issues
npx eslint . --ext .ts,.tsx --fix
```

### IDE Integration

Most IDEs will show ESLint errors. To configure:

- **VSCode**: Install ESLint extension
- **WebStorm**: ESLint is built-in
- **Vim/Neovim**: Use appropriate ESLint plugins

## 📚 Useful Links

- [Next.js ESLint Documentation](https://nextjs.org/docs/app/api-reference/config/eslint)
- [ESLint Rules Reference](https://eslint.org/docs/rules/)
- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)
- [React ESLint Plugin](https://github.com/jsx-eslint/eslint-plugin-react)

## ⚠️ Important Notes

1. **Don't ignore all rules** - This defeats the purpose of linting
2. **Use warnings liberally** - Better to see issues than ignore them
3. **Fix incrementally** - Address warnings over time
4. **Test builds locally** - Don't find out about issues in production
5. **Document exceptions** - Comment why specific rules are disabled

Your ESLint configuration is now optimized for stable builds while maintaining code quality! 🎉