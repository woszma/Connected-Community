# NFC Keychain Project & Deployment FAQ

## 回答你的問題：這可以免費部署到 GitHub 嗎？ (Can this be free to deploy to GitHub?)

**簡單答案：**
**可以**，這個 Web App 的前端界面可以完全免費部署到 **GitHub Pages**。

**詳細操作指南：**

### 1. 關於「免費」的定義與限制
- **前端 (Frontend):** 放在 GitHub Pages 是 **100% 免費** 的。用戶可以打開網址看到這個界面。
- **資料 (Database):** 
  - **目前版本 (Demo):** 使用 `localStorage`。資料儲存在用戶自己的瀏覽器中。**限制：** 當用戶 A 輸入資料後，傳連結給用戶 B，用戶 B 打開時**看不到** A 輸入的資料（因為沒有後端伺服器同步）。
  - **解決方案 (Free Tier Backend):** 如果你想真正運作（讓 A 的資料傳給 B），你需要連接一個免費的資料庫服務，例如 **Firebase (Realtime Database)** 或 **Supabase**。這些服務都有免費額度 (Free Tier)，對於個人專案或小規模使用（例如 < 500 人）通常是免費的。

### 2. 如何部署目前的版本到 GitHub Pages

如果你想先部署這個版本給朋友看（作為 Demo），請參考以下步驟：

**事前準備：**
確保你已經安裝 `node.js` 和 `git`。

**步驟：**

1.  **初始化 Git:**
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **推送到 GitHub:**
    - 在 GitHub 建立一個新 Repository。
    - 連結並推送：
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```

3.  **設定 GitHub Pages (自動化):**
    - 在專案中安裝 `gh-pages` 套件：
      ```bash
      npm install gh-pages --save-dev
      ```
    - 在 `package.json` 中新增：
      ```json
      "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME",
      "scripts": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build"
      }
      ```
    - 執行部署：
      ```bash
      npm run deploy
      ```

4.  **完成！**
    - 你的網站就會在 `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME` 上線了。

---

## Project Setup
This project uses React, Tailwind CSS, and Lucide Icons.

1.  `npm install`
2.  `npm start`
