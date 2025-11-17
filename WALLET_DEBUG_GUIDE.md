# 🔧 Wallet Connect Debug Guide

## 🚨 Common Issues & Solutions

### 1. **Wallet Not Detected**
**Problem**: Debug info shows "Not detected" for all wallets

**Solutions**:
- ✅ **Install a Solana wallet** (Phantom recommended)
- ✅ **Refresh the page** after installing wallet
- ✅ **Check if wallet extension is enabled**
- ✅ **Try different browser** (Chrome/Firefox work best)

### 2. **Wallet Detected But Connection Fails**
**Problem**: Wallet shows as "Available" but connection fails

**Solutions**:
- ✅ **Check browser console** for error messages
- ✅ **Make sure wallet is unlocked**
- ✅ **Try disconnecting and reconnecting** in wallet
- ✅ **Check if wallet is on correct network** (Mainnet/Devnet)

### 3. **Connection Works But Payment Fails**
**Problem**: Wallet connects but SOL payment fails

**Solutions**:
- ✅ **Check if you have enough SOL** in your wallet
- ✅ **Verify recipient wallet address** is correct
- ✅ **Try with smaller amount** first
- ✅ **Check network congestion**

## 🔍 Debug Steps

### Step 1: Check Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for error messages when clicking wallet buttons
4. Check for messages like:
   - "Phantom wallet detected"
   - "Attempting to connect to phantom wallet..."
   - "Wallet connection response: ..."

### Step 2: Verify Wallet Installation
1. Check if wallet extension is installed and enabled
2. Try opening wallet extension manually
3. Make sure wallet is unlocked
4. Check if wallet is connected to correct network

### Step 3: Test Different Wallets
1. Try Phantom wallet first (most reliable)
2. If Phantom fails, try Solflare
3. If all fail, check browser compatibility

### Step 4: Check Network Settings
1. Make sure you're using correct RPC URL
2. For testing: Use `https://api.devnet.solana.com`
3. For production: Use `https://api.mainnet-beta.solana.com`

## 🛠️ Quick Fixes

### Fix 1: Force Wallet Detection
Add this to browser console to manually detect wallets:
```javascript
console.log('Solana wallets available:');
console.log('Phantom:', !!window.solana?.isPhantom);
console.log('Solflare:', !!window.solflare);
console.log('Backpack:', !!window.backpack);
```

### Fix 2: Reset Wallet Connection
Add this to browser console to reset wallet state:
```javascript
// Clear any existing wallet state
localStorage.removeItem('walletName');
localStorage.removeItem('walletAddress');
// Refresh page
location.reload();
```

### Fix 3: Test with Devnet
Change RPC URL to devnet for testing:
```typescript
SOLANA_RPC_URL: 'https://api.devnet.solana.com'
```

## 📱 Mobile Issues

### Mobile Wallet Connection
- **Phantom Mobile**: Use WalletConnect or deep links
- **Solflare Mobile**: Use mobile app integration
- **Backpack Mobile**: Check mobile compatibility

### Mobile Browser Issues
- Some mobile browsers don't support wallet extensions
- Try using wallet's mobile app instead
- Use WalletConnect for mobile integration

## 🚀 Testing Checklist

- [ ] Wallet extension installed and enabled
- [ ] Browser console shows no errors
- [ ] Wallet detection works (debug info shows "Detected")
- [ ] Wallet connection succeeds
- [ ] SOL balance sufficient for payment
- [ ] Recipient wallet address is correct
- [ ] Network settings are correct

## 📞 Still Not Working?

If wallet connection still fails:

1. **Check browser console** for specific error messages
2. **Try different wallet** (Phantom → Solflare → Backpack)
3. **Test on different browser** (Chrome recommended)
4. **Check wallet extension permissions**
5. **Verify network connectivity**

## 🔗 Useful Links

- [Phantom Wallet](https://phantom.app/)
- [Solflare Wallet](https://solflare.com/)
- [Backpack Wallet](https://backpack.app/)
- [Solana Devnet Faucet](https://faucet.solana.com/)
- [Solana Explorer](https://explorer.solana.com/)

---

**Remember**: The debug info in the wallet popup will help you identify exactly what's going wrong!



