
# ⚔️ League of Mini: 2v2 Rift | 迷你峡谷

![Banner](https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop)

<div align="center">

[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

**“欢迎来到迷你峡谷，召唤师。敌军还有30秒到达战场！”**

[🎮 开始游戏](#-快速开始) • [📖 游戏指南](#-游戏指南) • [🛡️ 英雄介绍](#-英雄图鉴)

</div>

---

## 🌌 游戏简介 (Introduction)

**League of Mini** 是一款基于 Web 的轻量级 2v2 MOBA（多人在线战术竞技）游戏。它致敬了经典的《英雄联盟》，保留了核心的对线、补刀、推塔和装备购买机制，并将其浓缩在一个快节奏的单路对抗地图中。

无论你是想要练习走位，还是想体验海克斯科技风格的 UI，这里都是你的最佳战场。

### ✨ 核心特色
- **⚡ 2v2 激斗**：除了你和敌方 AI，还有一名智能 AI 盟友与你并肩作战。
- **🏹 真实手感**：还原了走A（Orb Walking）、技能预判、普攻前摇等细节。
- **💰 经济系统**：补刀、击杀英雄获取金币，在泉水购买强力装备。
- **🧙‍♂️ 技能机制**：每个英雄拥有独特的 Q（小技能）和 R（终极技能）。
- **🏰 塔防机制**：防御塔会优先攻击进入范围的小兵，保护好你的兵线！

---

## 🕹️ 游戏指南 (Gameplay)

### 🎮 操作方式 (Controls)

| 按键 / 操作 | 功能描述 |
| :--- | :--- |
| **🖱️ 右键点击** | **移动 / 攻击** (智能判定：点地板移动，点敌人攻击) |
| **⌨️ Q 键** | **施放基础技能** (指向性或非指向性) |
| **⌨️ R 键** | **施放终极技能** (大招，毁天灭地) |
| **⌨️ B 键** | **回城** (需吟唱4秒，被打断需重新施放) |
| **🛍️ 点击商店** | **购买装备** (仅在泉水区域或死亡时可用) |

### 🗺️ 战场地图 (The Map)

> “只有推倒敌方水晶，才能获得最终的胜利。”

地图分为 **秩序方 (蓝色)** 和 **混沌方 (红色)**。
1. **泉水**：你的出生点，回城后生命值和法力值会迅速恢复。
2. **兵线**：每30秒生成一波小兵，它们是推塔的关键。
3. **防御塔**：高伤害的防御建筑，不要在没有小兵时抗塔！
4. **水晶枢纽 (Nexus)**：游戏的最终目标，摧毁它即可获胜。

---

## 🛡️ 英雄图鉴 (Champions)

选择你的本命英雄，主宰战场！

| 英雄 | 定位 | 特色 |
| :--- | :--- | :--- |
| **⚔️ 盖伦兹 (Garenz)** | **战士** | 拥有高额的生命恢复和斩杀能力。Q技能加速沉默，R技能大宝剑从天而降。 |
| **✨ 拉克丝娜 (Luxana)** | **法师** | 远程消耗与控制的大师。Q技能禁锢敌人，R技能发射超远距离激光束。 |
| **🏹 艾希 (Ashe)** | **射手** | 持续输出的女王。Q技能提升攻速，R技能全图支援并眩晕敌人。 |
| **🥷 劫 (Zed)** | **刺客** | 阴影中的杀手。Q技能投掷手里剑，R技能瞬移突进并引爆死亡印记。 |

---

## 🛍️ 装备系统 (Item Shop)

不要忘记用金币强化自己！点击 HUD 右下角的 **商店图标** 打开购买界面。

<div align="center">
  <img src="https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=800&auto=format&fit=crop" alt="Item Shop Concept" width="600" style="border-radius: 10px; border: 2px solid #c8aa6e;" />
  <p><i>(装备能够提供攻击力、法强、护甲、移速等多种属性)</i></p>
</div>

* **🗡️ 长剑**：增加攻击力，适合射手和刺客。
* **⚡ 增幅典籍**：增加法术强度，法师必备。
* **👞 草鞋**：增加移动速度，走位更灵活。
* **❤️ 红水晶**：增加生命值，活着才有输出。

---

## 🚀 快速开始 (Getting Started)

在本地运行游戏非常简单：

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm start
   ```

3. **打开浏览器**
   访问 `http://localhost:3000` 即可开始游戏！

---

## 🛠️ 技术栈 (Tech Stack)

本项目使用现代前端技术构建，注重性能与代码可读性。

*   **Core**: React 19 (Hooks, Context)
*   **Language**: TypeScript (Strict typing for game logic)
*   **Styling**: Tailwind CSS (Utility-first styling)
*   **Icons**: Lucide React
*   **Game Loop**: `requestAnimationFrame` based custom engine

---

<div align="center">

**Created by viper3❤️**

</div>
