# 鍐崇瓥璁板綍

杩欓噷璁板綍浼氬奖鍝嶅浜哄崗浣溿€佸叏灞€浠ｇ爜缁撴瀯鎴栧悗缁紑鍙戠悊瑙ｇ殑鍙樻洿銆?
瀹冧笉鏄鎵规祦锛屼篃涓嶆槸姣忔寮€鍙戦兘瑕佸啓鐨勬棩鎶ャ€傛櫘閫氶〉闈㈠唴瀹逛慨鏀逛笉闇€瑕佽褰曘€?

## 当前有效决策摘要

- 文档入口：日常开发优先看 `README.md`、`AGENTS.md`、`docs/coding-guide.md` 和 `docs/collaboration-guide.md`；产品范围、组件库、自动化验证和历史决策按需看对应长期文档。
- 产品范围：`docs/tripkin-product-prd.md` 是当前 TripKin Demo 的产品范围依据，阶段性整改文档已整合进 PRD 和协作规范。
- 底部导航：`src/layouts/AppLayout/` 统一决定 `BottomNav` 是否显示；主 Tab 仅为 `/`、`/map`、`/match`、`/profile`；`/mbti`、`/mbti/test`、`/mbti/result`、`/bottle` 不显示底部导航。
- 页面协作：页面负责人优先改 `src/pages/<PageName>/`，公共路由、layout、全局样式、共享 store、共享组件变更需要说明影响范围，并按需记录决策。
- antd-mobile：标准移动端交互优先使用 `antd-mobile`，通用 UI 图标优先复用 `antd-mobile-icons`；核心卡片、业务视觉、地图渲染和品牌符号保持项目自定义。
- 验证边界：纯 Markdown 文档整理不要求运行 `npm run lint` 和 `npm run build`；如格式检查相关，运行 `npm run format:check`。`webapp-testing` 仅在任务明确要求自动化验证、Playwright、截图验证或可重复浏览器检查时使用。

以下历史条目保留作为决策账本。若历史条目提到已删除的阶段性文档，它们只表示当时来源；当前规则以本摘要、PRD、coding guide、collaboration guide 和 antd-mobile usage guide 为准。

## 浠€涔堟椂鍊欓渶瑕佽褰?

闇€瑕佽褰曪細

- 鏂板鎴栦慨鏀瑰叏灞€鏍峰紡鍙橀噺
- 鏂板渚濊禆
- 寮曞叆缁勪欢搴?- 淇敼璺敱缁撴瀯
- 淇敼鐩綍缁撴瀯
- 淇敼宸ョ▼鍖栭厤缃?- 鎶借法椤甸潰鍏叡缁勪欢

涓嶉渶瑕佽褰曪細

- 椤甸潰鍐呴儴鏍峰紡
- 椤甸潰鍐呴儴 mock 鏁版嵁
- 椤甸潰鍐呴儴灏忕粍浠?- 鏂囨璋冩暣
- 淇嚜宸遍〉闈㈤噷鐨?bug

## 璁板綍妯℃澘

````md
### YYYY-MM-DD 鍙樻洿鏍囬

- 绫诲瀷锛氬叏灞€鏍峰紡 / 渚濊禆 / 鍏叡缁勪欢 / 璺敱 / 宸ョ▼鍖?/ 鍏朵粬
- 鑳屾櫙锛氫负浠€涔堥渶瑕佽繖涓彉鏇?- 鍐冲畾锛氭渶缁堥噰鐢ㄤ粈涔堟柟妗?- 褰卞搷鑼冨洿锛氫細褰卞搷鍝簺鐩綍銆侀〉闈㈡垨鍗忎綔瑙勫垯
- 鍚庣画娉ㄦ剰锛氬紑鍙戞椂闇€瑕佹敞鎰忎粈涔?```

## 宸茶褰曞喅绛?

### 2026-06-21 閲囩敤 AppLayout 缁熶竴鎺у埗搴曢儴瀵艰埅

- 绫诲瀷锛氱洰褰曠粨鏋?/ 璺敱 / 鍏叡缁勪欢
- 鑳屾櫙锛氬綋鍓?`BottomNav` 鐢遍〉闈㈠悇鑷寕杞斤紝瀵艰嚧 MBTI 鍜?Bottle 杩欑被瀹屾暣椤甸潰涔熷甫涓婂簳鏍忋€傚畠浠笉鍦?`棣栭〉 / 鍦板浘 / 鍖归厤 / 鎴戠殑` 鍥涙爮涓紝娌℃湁姝ｇ‘ active tab锛屼篃浼氬共鎵版祦绋嬮〉鍜岀洰鐨勫湴鍐呭鍒嗘敮椤点€?- 鍐冲畾锛氬悗缁柊澧?`src/layouts/AppLayout/` 缁熶竴鎺у埗搴曢儴瀵艰埅鏄剧ず銆傚簳閮ㄤ富 Tab 鐧藉悕鍗曞浐瀹氫负 `/`銆乣/map`銆乣/match`銆乣/profile`銆侻BTI 涓夋璺敱鍜?`/bottle`涓嶆樉绀哄簳閮ㄥ鑸€傞〉闈笉鐩存帴`import BottomNav`锛宍BottomNav` 缁х画浣滀负 `src/components` 涓嬬殑瀵艰埅 UI銆?- 褰卞搷鑼冨洿锛歚src/layouts/AppLayout`銆乣src/router`銆乣src/components/BottomNav`銆丠ome銆丮ap銆丮atch銆丳rofile銆丮BTI銆丅ottle锛屼互鍙婂簳閮ㄥ畨鍏ㄥ尯銆佺洰鐨勫湴瀵艰埅涓婁笅鏂囧拰鐩稿叧鍥㈤槦鏂囨。銆?- 鍚庣画娉ㄦ剰锛氳縼绉昏鏄庤 historical note: navigation layout rules have been merged into `docs/coding-guide.md`and`docs/collaboration-guide.md`銆傝縼绉讳唬鐮佹椂瑕佸悓姝ョЩ闄?MBTI/Bottle 涓哄簳鏍忛鐣欑殑搴曢儴绌虹櫧锛屼繚鐣?Map fixed 娴眰鐨勫簳鏍忚浣嶉€昏緫锛屽苟璁?Profile 瀹藉害涓庡簳鏍忓搴﹀榻愩€傚鏈潵灏?Bottle 鏀逛负搴曟爮涓€绾у叆鍙ｏ紝蹇呴』鍏堟洿鏂版湰鍐崇瓥銆丳RD銆佹暣鏀硅寖鍥村拰涓?Tab 鐧藉悕鍗曘€?

### 2026-06-21 鏄庣‘绾枃妗ｅ彉鏇寸殑楠岃瘉杈圭晫

- 绫诲瀷锛氬伐绋嬪寲 / 鍗忎綔瑙勫垯
- 鑳屾櫙锛氬苟闈炴墍鏈夋枃妗ｆ暣鐞嗛兘浼氬奖鍝嶉〉闈㈣繍琛屻€傚绾?Markdown 璇存槑銆佸崗浣滆褰曘€侀渶姹傛暣鐞嗘垨鍐崇瓥璁板綍寮哄埗杩愯 `npm run lint` 鍜?`npm run build`锛屼細澧炲姞涓嶅繀瑕佺殑鏈湴鑰楁椂鍜屽櫔闊炽€?- 鍐冲畾锛氫粎淇敼绾枃妗ｅ唴瀹癸紝涓斾笉鏀瑰彉浠ｇ爜銆佹牱寮忋€佽矾鐢便€佽剼鏈€佷緷璧栥€佸伐绋嬮厤缃€佹湇鍔＄浠ｇ爜鎴栧彲鎵ц鍛戒护鏃讹紝涓嶈姹傝繍琛?`npm run lint` 鍜?`npm run build`銆傚鏋滄枃妗ｆ敼鍔ㄤ細褰卞搷宸ョ▼鎵ц鏂瑰紡鎴栧寘鍚渶瑕侀獙璇佺殑鍛戒护锛屾寜瀹為檯褰卞搷琛ュ厖瀵瑰簲楠岃瘉銆?- 褰卞搷鑼冨洿锛氬洟闃熸彁浜ゅ墠妫€鏌ャ€丄I 鍗忎綔鏀跺彛璇存槑銆佹枃妗ｆ暣鐞嗙被浠诲姟銆?- 鍚庣画娉ㄦ剰锛氳繖涓鍒欎笉闄嶄綆浠ｇ爜鏀瑰姩鐨勯獙璇佽姹傘€傚嚒鏄奖鍝嶈繍琛岃涓恒€佹瀯寤洪摼璺垨鍏变韩缁勪欢鐨勬敼鍔紝浠嶉渶鎸夊師瑙勫垯杩愯 `npm run lint` 鍜?`npm run build`銆?

### 2026-06-21 璋冩暣搴曢儴涓诲鑸负棣栭〉 / 鍦板浘 / 鍖归厤 / 鎴戠殑

- 绫诲瀷锛氬叕鍏辩粍浠?/ 浜у搧瀵艰埅 / 鍗忎綔瑙勫垯
- 鑳屾櫙锛歁atch 鏄?TripKin 鐨勬牳蹇冧骇鍝佷富閾捐矾涔嬩竴锛岀敤鎴烽渶瑕佷粠搴曢儴瀵艰埅闅忔椂杩涘叆鎼瓙 / 琛岀▼鍖归厤銆侻BTI 浠嶆槸閲嶈鑳藉姏锛屼絾瀹冪殑鑱岃矗鏄敓鎴愭垨鏇存柊鏃呰浜烘牸锛屼笉閫傚悎闀挎湡鍗犵敤搴曢儴涓诲鑸€?- 鍐冲畾锛氬簳閮ㄥ鑸粺涓€涓?`棣栭〉 / 鍦板浘 / 鍖归厤 / 鎴戠殑`銆俙BottomNav` 鏄法椤甸潰鍏叡缁勪欢锛孧atch 浣滀负搴曟爮鏍稿績鍏ュ彛锛汳BTI 鏀圭敱 Home銆丳rofile 鐨勪汉鏍煎尯鍩燂紝浠ュ強蹇呰椤甸潰鍐呭崱鐗囨垨 CTA 杩涘叆銆俙MbtiEntryModal` 鍙湇鍔℃槑纭殑椤甸潰鍐?MBTI 寮曞锛屼笉鍐嶄綔涓哄簳閮ㄥ鑸涓虹殑涓€閮ㄥ垎銆?- 褰卞搷鑼冨洿锛歚src/components/BottomNav`銆丠ome銆丮ap銆丮atch銆丳rofile銆丮BTI 鍏ュ彛璇存槑銆佺浉鍏抽獙鏀舵爣鍑嗐€侀〉闈㈠崗浣滄枃妗ｅ拰鍚庣画瀵艰埅澶嶉獙銆?- 鍚庣画娉ㄦ剰锛?026-06-20 鍏充簬 `棣栭〉 / 鍦板浘 / MBTI / 鎴戠殑`鐨勫簳鏍忓喅绛栧凡琚湰鍐崇瓥鍙栦唬銆傚悗缁〉闈㈣礋璐ｄ汉涓嶈绉佽嚜淇敼`BottomNav` 涓€绾у叆鍙ｏ紱濡傚啀娆¤皟鏁翠竴绾у叆鍙ｏ紝蹇呴』鍚屾鏈喅绛栬褰曘€丳RD銆佹暣鏀硅寖鍥村拰鐩稿叧楠屾敹鏂囨。銆?

### 2026-06-20 钀藉湴棣栭〉涓庡叏灞€ MBTI 鍏ュ彛鍏叡楠ㄦ灦

- 绫诲瀷锛氳矾鐢?/ 鍏叡缁勪欢 / 鍏朵粬
- 鑳屾櫙锛氶涔﹁崏绋跨‘璁ゅ悗缁骇鍝侀棴鐜渶瑕侀椤点€佸洓鏍忓簳閮ㄥ鑸拰鍏ㄥ眬 MBTI 鍏ュ彛銆傝璋冩暣浼氬奖鍝嶈矾鐢辩粨鏋勩€乣BottomNav`銆丮BTI 妯″潡鍏ュ彛鍜屽悇椤甸潰骞惰寮€鍙戞柟寮忥紝濡傛灉姣忎釜椤甸潰璐熻矗浜哄悇鑷『鎵嬫敼鍏叡鏂囦欢锛屽鏄撻€犳垚鍐茬獊銆?- 鍐冲畾锛氬凡瀹屾垚鍏叡楠ㄦ灦灏忔敼鍔紝鍐嶈繘鍏ュ垎椤甸潰骞惰寮€鍙戙€傚叕鍏遍鏋跺寘鎷細棣栭〉璺敱 `/` 鐨勮交閲忛椤碉紱`/mbti`銆乣/mbti/test`銆乣/mbti/result` 璺敱鍏ュ彛锛沗棣栭〉 / 鍦板浘 / MBTI / 鎴戠殑` 鍥涙爮 `BottomNav`锛沗MbtiEntryModal`锛岀敤浜庨潪 MBTI 椤甸潰鐐瑰嚮搴曢儴 MBTI 鏃跺厛寮瑰嚭寮曞寮圭獥銆侻BTI 妯″潡鍐呴儴鐐瑰嚮搴曢儴 MBTI 涓嶉噸澶嶅脊绐椼€?- 褰卞搷鑼冨洿锛歚src/router`銆乣src/components/BottomNav`銆乣src/components/MbtiEntryModal`銆乣src/pages/Home`銆乣src/pages/Mbti`锛屼互鍙婃墍鏈夋帴鍏ュ簳閮ㄥ鑸殑椤甸潰銆?- 鍚庣画娉ㄦ剰锛氬叕鍏遍鏋跺彧鍋氬埌鑳芥寕杞姐€佽兘璺宠浆銆佷笉浼氭尅浣忛〉闈㈣礋璐ｄ汉宸ヤ綔锛涗笉瑕佸湪楠ㄦ灦缁存姢浠诲姟閲屽す甯﹀畬鏁撮椤佃繍钀ュ唴瀹规垨鍗曢〉瑙嗚閲嶅啓銆傚閮ㄧ煭瑙嗛鍏ュ彛銆佹秷鎭〉銆佺淮搴﹀垎鏋愰〉銆佹繁搴︽帹鑽愮畻娉曘€佺湡瀹炲垎浜拰鍘熷瀷鍥句弗鏍煎鍒讳粛鏈‘璁わ紝涓嶈繘鍏ユ寮忔墽琛岃寖鍥淬€傛湰鏉′腑鐨?`棣栭〉 / 鍦板浘 / MBTI / 鎴戠殑` 搴曟爮鏂规宸茶 2026-06-21 `棣栭〉 / 鍦板浘 / 鍖归厤 / 鎴戠殑` 鍐崇瓥鍙栦唬銆?

### 2026-06-20 Match/Bottle 杩涘叆 server mock API 鍙岄€氶亾

- 绫诲瀷锛氱洰褰曠粨鏋?/ 宸ョ▼鍖?/ 鍏朵粬
- 鑳屾櫙锛歁atch 鍜?Bottle 宸插厛閫氳繃 `src/services` 鏀跺彛鏁版嵁璁块棶銆備负浜嗙户缁悜鍚庣杩佺Щ锛屼絾涓嶆墦鏂函鍓嶇 demo锛岄渶瑕佽椤甸潰鍦ㄦ湰鍦?mock 鍜屽悗绔?mock API 涔嬮棿鍙垏鎹€?- 鍐冲畾锛歚server/`鎻愪緵 Match/Bottle 鐨勬渶灏?mock API锛屽苟淇濈暀`src/services`浣滀负鍞竴鍓嶇璁块棶鍏ュ彛銆傛湭閰嶇疆`VITE_API_BASE_URL`鏃讹紝service 缁х画璇诲彇鍓嶇鏈湴 mock锛涢厤缃悗锛宻ervice 璇锋眰`server/` mock API銆傚綋鍓嶅彧鍋氳交閲?mock API 璺戦€氾紝涓嶅缓绔嬪悗绔崟鍏冩祴璇曟垨濂戠害娴嬭瘯浣撶郴銆?- 褰卞搷鑼冨洿锛歚server/src` mock API銆乣src/services/matchService.ts`銆乣src/services/bottleService.ts`銆丮atch/Bottle 椤甸潰鏁版嵁鍔犺浇鏂瑰紡銆丷EADME 鐜鍙橀噺璇存槑鍜屽悗绔獙璇佸懡浠ゃ€?- 鍚庣画娉ㄦ剰锛歴erver mock data 涓?frontend mock data 褰撳墠瀛樺湪閲嶅锛岀煭鏈熺敤浜庨殧绂诲悗绔竟鐣岋紱鍚庣画鑻ョ户缁墿鎺ュ彛锛屽啀璁ㄨ鍏变韩濂戠害銆佺粺涓€ seed 鎴栨寮忔祴璇曠瓥鐣ャ€傚綋鍓嶄粛涓嶅紩鍏ユ暟鎹簱銆佺櫥褰曘€佺湡瀹?AI銆佺湡瀹炲尮閰嶇畻娉曘€佸鏉?CI 鎴栨寮忓墠绔祴璇曟鏋躲€俙.trae/specs` 灞炰簬鏈湴鎵ц璁板綍锛屼笉杩涘叆甯歌鎻愪氦锛涜嫢瑕佺撼鍏ヤ粨搴撻渶鍙﹁纭銆?

### 2026-06-20 寮曞叆 server 鏈€灏?TypeScript mock API 楠ㄦ灦

- 绫诲瀷锛氱洰褰曠粨鏋?/ 渚濊禆 / 宸ョ▼鍖?- 鑳屾櫙锛氬墠绔凡閫氳繃 `src/services` 鏀跺彛 Match 鍜?Bottle 鐨?mock 鏁版嵁鍏ュ彛锛屽悗缁渶瑕佷竴涓渶灏忓悗绔壙鎺ュ墠鍚庣鑱旇皟锛屼絾褰撳墠浠嶄笉鑳藉紩鍏ユ暟鎹簱銆佺櫥褰曘€佺湡瀹?AI 鎴栫湡瀹炲尮閰嶇畻娉曘€?- 鍐冲畾锛氭柊澧?`server/` 浣滀负鐙珛 TypeScript Express 鍚庣鐩綍锛屼娇鐢ㄧ嫭绔?`package.json` 鍜?`tsconfig.json`銆傚垵濮嬮樁娈典粎鎻愪緵 `/api/health` 鍋ュ悍妫€鏌ワ紝杩斿洖 `{ ok: true, service: 'tripkin-server' }`锛岀敤浜庣‘璁ゅ悗绔湇鍔″彲浠ュ惎鍔ㄥ拰璁块棶銆?- 褰卞搷鑼冨洿锛歚server/` 鍚庣鐩綍銆丷EADME 鏈湴鍚姩璇存槑銆乣AGENTS.md` 褰撳墠鑼冨洿銆乣docs/coding-guide.md` 鐩綍鑱岃矗鍜?`docs/collaboration-guide.md`鍗忎綔瑙勫垯銆?- 鍚庣画娉ㄦ剰锛氬墠绔〉闈粛閫氳繃`src/services` 璁块棶鏁版嵁锛屼笉鐩存帴鎷煎悗绔?URL銆侻atch/Bottle 涓氬姟鎺ュ彛杩佺Щ闇€瑕佸崟鐙‘璁ゆ帴鍙ｅ绾︼紱涓嶈鍦ㄦ湰闃舵椤烘墜鍔犲叆鏁版嵁搴撱€佺櫥褰曘€佺湡瀹?AI銆佺湡瀹炲尮閰嶇畻娉曘€佸鏉?CI 鎴栨寮忔祴璇曟鏋躲€?

### 2026-06-20 鏂板 MVP 鍥涘叆鍙ｅ簳閮ㄥ鑸?BottomNav

- 绫诲瀷锛氬叕鍏辩粍浠?/ 璺敱
- 鑳屾櫙锛氭渶鏂?MVP 鏂规纭涓€绾у叆鍙ｄ负鍦板浘銆佸尮閰嶃€佹紓娴佺摱銆佹垜鐨勶紱鏃呰娴嬭瘯浠呬綔涓烘柊鐢ㄦ埛鎴栧亸濂芥洿鏂板叆鍙ｏ紝涓嶅啀闀挎湡鍗犵敤搴曢儴瀵艰埅銆?- 鍐冲畾锛氬湪 `src/components/BottomNav` 鏂板璺ㄩ〉闈㈠簳閮ㄥ鑸粍浠讹紝褰撳墠鎺ュ叆 `/map`銆乣/match`銆乣/bottle`銆乣/profile`锛屼笉鎺ュ叆 `/mbti`銆?- 褰卞搷鑼冨洿锛氫富娴佺▼鍥涗釜椤甸潰銆佺Щ鍔ㄧ搴曢儴瀹夊叏鍖恒€佸悗缁〉闈㈡柊澧炰竴绾у叆鍙ｆ椂鐨勫鑸淮鎶ゃ€?- 鍚庣画娉ㄦ剰锛氳鍐崇瓥鍏堣鈥?026-06-20 钀藉湴棣栭〉涓庡叏灞€ MBTI 鍏ュ彛鍏叡楠ㄦ灦鈥濇洿鏂帮紝闅忓悗鍙堣 2026-06-21 `棣栭〉 / 鍦板浘 / 鍖归厤 / 鎴戠殑` 鍐崇瓥鍙栦唬銆傚綋鍓?`BottomNav` 浠?`棣栭〉 / 鍦板浘 / 鍖归厤 / 鎴戠殑` 涓哄噯銆備笉瑕佷负鍗曚釜椤甸潰绉佽嚜鏀瑰叕鍏卞鑸粨鏋勶紱濡傛柊澧炴垨绉婚櫎涓€绾у叆鍙ｏ紝闇€瑕佸悓姝ユ洿鏂版湰鍐崇瓥璁板綍鍜岀浉鍏抽〉闈㈤獙鏀躲€?

### 2026-06-19 纭 TripKin 鎬讳綋 PRD 浣滀负褰撳墠浜у搧鑼冨洿渚濇嵁

- 绫诲瀷锛氬叾浠?- 鑳屾櫙锛氬洟闃熷凡鏈夐潤鎬侀〉闈㈠拰鏁存敼璁″垝锛屼絾缂哄皯涓€浠戒笂娓镐骇鍝佹€昏鏄庛€傚彧鐪嬫暣鏀硅鍒掓椂锛屽洟闃熸垚鍛樺拰 AI 瀹规槗涓嶇煡閬?TripKin 鐨勪富閾捐矾銆侀〉闈㈣亴璐ｅ拰涓嶅仛鑼冨洿銆?- 鍐冲畾锛氭柊澧?`docs/tripkin-product-prd.md` 浣滀负褰撳墠 TripKin Demo 鐨勬寮忎骇鍝?PRD銆傝鏂囨。鍙啓宸茬‘璁よ寖鍥达紝璇存槑浜у搧瀹氫綅銆佷富閾捐矾銆侀〉闈㈣亴璐ｃ€佸叕鍏变骇鍝佺害瀹氥€侀獙鏀跺熀鍑嗗拰涓嶅仛鑼冨洿銆傚悗缁暣鏀硅鍒掍互璇?PRD 涓轰骇鍝佷緷鎹€?- 褰卞搷鑼冨洿锛歊EADME 鏂囨。绱㈠紩銆乣historical-demo-fix-scope`銆佹墍鏈変富椤甸潰鍚庣画闇€姹傜悊瑙ｏ紝浠ュ強 AI 鍗忎綔鏃剁殑闇€姹傚叆鍙ｃ€?- 鍚庣画娉ㄦ剰锛氭湭纭鎯虫硶浠嶆斁鍦ㄩ涔︽垨鏈湴鑽夌涓紝涓嶇洿鎺ュ啓鍏ュ洟闃熸寮忔枃妗ｃ€侾RD 涓嶇淮鎶や汉鍛樺垎宸ワ紝涓嶆浛浠ｅ叿浣撴暣鏀硅鍒掋€?

### 2026-06-17 纭畾绉诲姩绔紑鍙戝熀鍑?

- 绫诲瀷锛氬叏灞€鏍峰紡
- 鑳屾櫙锛氬洟闃熸垚鍛樺彲鑳芥寜涓嶅悓鎵嬫満瀹藉害鍐欓〉闈紝瀹规槗瀵艰嚧瑙嗚鍜屽竷灞€涓嶇粺涓€銆?- 鍐冲畾锛氬綋鍓嶉樁娈典互 `375px` 瀹藉害浣滀负璁捐鍜屽紑鍙戝熀鍑嗭紝椤甸潰瀹藉害淇濇寔寮规€э紝楂樺害鑷劧婊氬姩銆?- 褰卞搷鑼冨洿锛氭墍鏈夐〉闈㈡牱寮忋€?- 鍚庣画娉ㄦ剰锛氫笉瑕佹妸椤甸潰鍐欐鎴?`width: 375px` 鎴栧浐瀹氶珮搴︾敾甯冦€?

### 2026-06-18 纭 antd-mobile 浣跨敤杈圭晫

- 绫诲瀷锛氫緷璧?/ 缁勪欢搴?- 鑳屾櫙锛氬綋鍓?Demo 闇€瑕佸揩閫熷畬鎴愮Щ鍔ㄧ寮圭獥銆佸垏鎹€佸弽棣堢瓑鍩虹浜や簰锛屼絾涓嶈兘璁╅〉闈㈠畬鍏ㄥ彉鎴愮粍浠跺簱榛樿瑙嗚銆?- 鍐冲畾锛氬厑璁稿湪闇€瑕佹椂浣跨敤 `antd-mobile`銆備紭鍏堜娇鐢ㄥ叾鍩虹浜や簰缁勪欢锛岄〉闈㈡牳蹇冭瑙夈€佸崱鐗囥€佹爣绛惧拰涓绘寜閽粛閫氳繃 CSS Modules 鑷畾涔夈€傚叿浣撹鑼冭 `docs/antd-mobile-usage-guide.md`銆?- 褰卞搷鑼冨洿锛氬悗缁彲鑳戒娇鐢ㄧ粍浠跺簱鐨勯珮浜や簰绉诲姩椤甸潰锛屼緥濡傞渶瑕佸脊灞傘€佹ā寮忓垏鎹㈠拰鎿嶄綔鍙嶉鐨勯〉闈€?- 鍚庣画娉ㄦ剰锛氶娆″畨瑁呮垨鍗囩骇 `antd-mobile` 鏃讹紝闇€瑕佸悓姝ユ洿鏂颁緷璧栨枃浠跺苟杩愯 `npm run lint` 鍜?`npm run build`锛涢櫎 `antd-mobile` 澶栵紝涓嶈鑷寮曞叆鍏朵粬缁勪欢搴撱€?

### 2026-06-18 纭鏈湴寮€鍙戣崏绋垮尯

- 绫诲瀷锛氬叾浠?- 鑳屾櫙锛氬紑鍙戣繃绋嬩腑浼氫骇鐢熶釜浜鸿崏绋裤€丄I 瀵硅瘽鎬荤粨銆佹埅鍥惧弬鑰冨拰鍒嗘璁″垝锛涜繖浜涘唴瀹瑰涓汉鎺ㄨ繘鏈夌敤锛屼絾鍦ㄧ‘璁ゅ墠涓嶅簲杩涘叆姝ｅ紡浠撳簱鏂囨。銆?- 鍐冲畾锛氫娇鐢?`.local-docs/` 浣滀负涓汉寮€鍙戣崏绋垮尯锛屽苟鍔犲叆 Git 蹇界暐銆傝鐩綍鍙互淇濆瓨涓汉涓婁笅鏂囧拰鏈‘璁ゆ媶瑙ｏ紝浣嗕笉浣滀负鍥㈤槦姝ｅ紡闇€姹傘€佽鑼冩垨鍐崇瓥渚濇嵁銆?- 褰卞搷鑼冨洿锛氭墍鏈夊洟闃熸垚鍛樼殑鏈湴寮€鍙戞祦绋嬶紝浠ュ強 AI 鍗忎綔鏃剁殑涓婁笅鏂囦繚瀛樻柟寮忋€?- 鍚庣画娉ㄦ剰锛氬綋 `.local-docs/` 涓殑鍐呭宸茬粡纭浼氬奖鍝嶅浜哄崗浣溿€佸叕鍏辫鍒欐垨鍚庣画寮€鍙戠悊瑙ｆ椂锛岄渶瑕佹彁鐐煎悗鍚屾鍒版寮?`docs/`锛屽繀瑕佹椂璁板綍鍐崇瓥銆?

### 2026-06-18 纭 TripKin 瑙嗚 token 涓?antd-mobile 鍙橀噺瑕嗙洊

- 绫诲瀷锛氬叏灞€鏍峰紡
- 鑳屾櫙锛氬悗缁〉闈細浣跨敤 `antd-mobile` 瀹屾垚寮瑰眰銆佸垏鎹㈠拰鍙嶉绛夊熀纭€浜や簰锛屼絾椤圭洰瑙嗚涓嶈兘琚粍浠跺簱榛樿椋庢牸甯﹀亸銆?- 鍐冲畾锛氬湪 `src/styles/variables.less` 涓缓绔?TripKin 鍏ㄥ眬瑙嗚 token锛屽苟鍚屾瑕嗙洊 `--adm-color-primary`銆乣--adm-color-success`銆乣--adm-color-text`銆乣--adm-color-weak`銆乣--adm-color-light`銆乣--adm-border-radius` 绛?antd-mobile 鍩虹 CSS 鍙橀噺銆?- 褰卞搷鑼冨洿锛歚src/styles` 鍏ㄥ眬鍙橀噺銆佸悗缁娇鐢?antd-mobile 鐨勯〉闈紝浠ュ強闇€瑕佹秷璐归」鐩鑹层€佸渾瑙掋€侀槾褰卞拰琛ㄩ潰灞傜骇鐨勯〉闈㈡牱寮忋€?- 鍚庣画娉ㄦ剰锛氶〉闈㈡牳蹇冭瑙変粛閫氳繃 CSS Modules 鑷畾涔夛紝涓嶈鐩存帴鍫嗛粯璁?antd-mobile 缁勪欢褰撴渶缁堣瑙夛紱鏃ц矾鐢卞崰浣嶉〉涓嶆槸鏂拌瑙夊弬鑰冨璞★紝鍙仛鏋勫缓鍜屽熀纭€灞曠ず妫€鏌ャ€?

### 2026-06-18 纭鍙傝€冨浘涓庨〉闈㈠唴缁勪欢鍗忎綔瑙勫垯

- 绫诲瀷锛氬叾浠?- 鑳屾櫙锛氬鏉傞〉闈㈠紑鍙戜腑瀹规槗鍑虹幇鍙傝€冨浘杩樺師寮哄害涓嶆竻銆侀〉闈㈠唴澶嶆潅缁勪欢鏍峰紡闆嗕腑鍒版牴 `module.less`銆佷互鍙婄Щ鍔ㄧ鏍囧噯浜や簰鑳藉姏鏈浼樺厛浣跨敤鐨勯棶棰樸€?- 鍐冲畾锛氬鏉傞〉闈㈠唴缁勪欢浼樺厛鍦ㄩ〉闈㈢洰褰曚笅鎷嗗垎锛屽苟閰嶅 `index.tsx + ComponentName.module.less`锛涘彂鐜?`.local-docs/` 涓湁鍙傝€冨浘鏃讹紝AI 鎴栧崗浣滆€呭繀椤诲厛纭鏄弗鏍艰繕鍘熴€侀鏍煎弬鑰冭繕鏄寚瀹氶儴鍒嗗弬鑰冿紱瀵圭Щ鍔ㄧ鏍囧噯浜や簰浼樺厛浣跨敤 antd-mobile锛岃瑙夌敱 CSS Modules 瑕嗙洊銆?- 褰卞搷鑼冨洿锛歚docs/coding-guide.md`銆乣docs/collaboration-guide.md`銆乣docs/antd-mobile-usage-guide.md`锛屼互鍙婂悗缁湁鍙傝€冨浘鎴栧鏉傞〉闈㈠唴缁勪欢鐨勫紑鍙戜换鍔°€?- 鍚庣画娉ㄦ剰锛歚.local-docs/` 浠嶄笉杩涘叆 Git锛涘綋鍏朵腑鐨勫弬鑰冨浘鎴栬瑙夌粨璁鸿纭褰卞搷澶氫汉鍗忎綔鏃讹紝闇€瑕佹彁鐐煎埌姝ｅ紡鏂囨。鎴栨湰鍦版墽琛岃鍒掞紝骞跺啓娓呮杩樺師鑼冨洿銆佷笉鍙亸绂婚」鍜屽彲鑷敱璋冩暣椤广€?

### 2026-06-18 纭鏃呰鍦板浘鐪熷疄鍦板浘鎺ュ叆鏂瑰紡

- 绫诲瀷锛氬叾浠?- 鑳屾櫙锛歚/map` 闇€瑕佹敮鎸佺湡瀹炲湴鍥惧簳鍥撅紝鍚屾椂淇濇寔褰撳墠 Demo 鍙繍琛屽拰鍙埅鍥俱€?- 鍐冲畾锛歚/map` 浣跨敤楂樺痉 Web 绔?JS API 浣滀负鐪熷疄鍦板浘鏉ユ簮锛岄€氳繃鏈湴 `.env.local` 閰嶇疆 `VITE_AMAP_KEY` 鍜?`VITE_AMAP_SECURITY_CODE`锛涙湭閰嶇疆鎴栧姞杞藉け璐ユ椂浣跨敤椤甸潰鍐呴潤鎬?SVG 鍦板浘鍏滃簳銆備笉鏂板鍦板浘 npm 渚濊禆銆?- 褰卞搷鑼冨洿锛歚/map` 椤甸潰銆佹湰鍦板紑鍙戠幆澧冮厤缃€丷EADME 鏈湴寮€鍙戣鏄庛€?- 鍚庣画娉ㄦ剰锛氫笉瑕佹妸鐪熷疄 Key 鎴栧畨鍏ㄥ瘑閽ユ彁浜ゅ埌浠撳簱锛涘湴鍥句笂鐨?TripKin 鎮诞鎺т欢鍜屽簳閮ㄥ崱鐗囦粛鐢遍〉闈?CSS Modules 鑷畾涔夈€?

### 2026-06-19 纭鏈湴椤甸潰楠岃瘉鏂瑰紡

- 绫诲瀷锛氬伐绋嬪寲 / 鍏朵粬
- 鑳屾櫙锛氬綋鍓?Demo 闇€瑕佹湰鍦版墦寮€椤甸潰銆佹埅鍥惧拰妫€鏌ヤ氦浜掞紝浣嗘殏涓嶅紩鍏ユ寮忔祴璇曟鏋躲€丆I 鎴?npm 娴嬭瘯鑴氭湰銆?- 鍐冲畾锛氬厑璁告寜闇€浣跨敤 `webapp-testing` 鍋氭湰鍦伴〉闈㈤獙璇侊紱Python 铏氭嫙鐜銆佷复鏃?Playwright 鑴氭湰銆佹埅鍥惧拰杩愯浜х墿鏀惧湪鏈湴 `.venv/` 鍐咃紝骞跺皢 `.venv/` 鍔犲叆 Git 蹇界暐銆傚叿浣撶敤娉曡 `docs/webapp-testing-guide.md`銆?- 褰卞搷鑼冨洿锛歚.gitignore`銆乣docs/collaboration-guide.md`銆乣docs/webapp-testing-guide.md`锛屼互鍙婇渶瑕佹湰鍦伴噸澶嶉獙璇侀〉闈㈢殑鍗忎綔娴佺▼銆?- 鍚庣画娉ㄦ剰锛歚webapp-testing` 涓嶆浛浠?`npm run lint`銆乣npm run build` 鎴栦汉宸ヨ瑙夎蛋鏌ワ紱鍙湁鐢ㄦ埛鎴栦换鍔℃槑纭彁鍒版祴璇曘€佽嚜鍔ㄥ寲楠岃瘉鎴栨埅鍥鹃獙璇佹椂鎵嶄娇鐢ㄣ€備笉浣跨敤杩欏娴佺▼鐨勬垚鍛樹笉闇€瑕佸垱寤?`.venv/`锛涙祴璇曞尯鍜岃嚜鍔ㄥ寲浜х墿閮藉睘浜庢湰鍦板拷鐣ュ唴瀹广€備笉瑕佹妸涓汉 AI 鐩綍閲岀殑 skill 澶嶅埗杩涗粨搴擄紱濡傛灉鏈潵瑕佹彁浜ら暱鏈熷鐢ㄧ殑娴嬭瘯鑴氭湰锛岄渶瑕侀噸鏂扮‘璁ゆ祴璇曠洰褰曘€佷緷璧栧拰鍗忎綔杈圭晫銆?

### 2026-06-19 寮曞叆璺ㄩ〉闈㈠叡浜細璇濅粨搴?useTripStore.ts 涓庣被鍨?types/mbti.ts

- 绫诲瀷锛氱洰褰曠粨鏋?/ 璺ㄩ〉闈㈠叕鍏变欢锛堝叡浜姸鎬侊級
- 鑳屾櫙锛歁BTI 娴嬭瘎瀹屾垚鍚庯紝鐢ㄦ埛鐨勪汉鏍肩粨鏋溿€佺洰鐨勫湴绛変俊鎭渶瑕佸湪鍚庣画椤甸潰锛圡ap / Match锛夌户缁秷璐广€備箣鍓嶈繖浜涗俊鎭病鏈夌粺涓€瀛樻斁澶勶紝浠呴潬 URL 鍙傛暟鎴栭〉闈㈠唴 `useState` 浼犻€掞紝鏃犳硶璺ㄩ〉闈㈠鐢ㄣ€倆ustand 宸叉槸椤圭洰鏃㈡湁鎶€鏈爤锛坄src/store` 鏄?`docs/coding-guide.md`绾﹀畾鐨勫叡浜姸鎬佺洰褰曪級锛屽洜姝ゆ湰娆′笉鏂板渚濊禆锛屼粎鍦ㄨ鐩綍涓嬪缓绔嬮涓法椤甸潰鍏变韩浼氳瘽浠撳簱銆?- 鍐冲畾锛氬湪`src/store/useTripStore.ts`鏂板缓 Zustand 浠撳簱`useTripStore`锛岀姸鎬佸舰鐘跺畾涔夊湪 `src/types/mbti.ts` 鐨?`TripSession` 鎺ュ彛涓€備粨搴撳澶栨毚闇蹭袱涓?setter锛歚setMbtiResult(payload)` 鍦?MBTI 瀹屾垚锛堟垨璺宠繃锛夋椂鍐欏叆瀹屾暣浼氳瘽锛沗setDestination(destination)` 鍦ㄨ繘鍏?`/mbti`鏃剁敱 URL`?dest=` 瑙﹀彂鍐欏叆銆備細璇濆瓧娈靛寘鎷細`personaId`銆乣mbtiTypeCn/mbtiTypeEn`銆乣tagline`銆乣tags`銆乣nickname`銆乣destination`銆乣avatarKey`銆乣accent`銆乣socialIntent`銆乣moduleStatus`銆乣skipped`銆乣rawScores`銆?- 褰卞搷鑼冨洿锛歚src/store/useTripStore.ts`銆乣src/types/mbti.ts`锛屼互鍙?`src/pages/Mbti/`锛堝啓鍏ユ柟 `index.tsx`銆佽鍙栨柟 `components/IdentityCard.tsx`锛夈€傛湰娆″悎骞跺悗 Map銆丮atch銆丅ottle 涓変釜椤甸潰鍧囦负鍗犱綅 stub锛?*灏氭湭鎺ュ叆璇ヤ粨搴?*鈥斺€斿嵆銆屼粨搴撶洰鍓嶄粎鐢?MBTI 椤靛啓鍏ワ紝鏆傛棤澶栭儴杩愯鏃惰鑰呫€嶃€傚悗缁?Map / Match 鎺ュ叆浠撳簱鏃堕渶閬靛畧鏈粨搴撶殑鍐?璇荤害瀹氥€?- 鍚庣画娉ㄦ剰锛? 1. **瀛楁璇箟闄烽槺锛堝姟蹇呭憡鐭ユ帴鍏ユ柟锛?\*锛歚TripSession.mbtiTypeEn`瀛樼殑鏄€屼汉鏍兼爣棰樸€嶈€岄潪銆孧BTI 瀛楁瘝浠ｇ爜銆嶃€傚疄闄呭彇鍊间负`CYBER-RAIDER`/`ZEN-CAPYBARA`/`BUDGET-ARCHITECT`/`ROMANTIC-OBSERVER`锛堟潵鑷?`data.ts` 鐨?`persona.titleEn`锛夛紝鍐欏叆鐐瑰湪 `pages/Mbti/index.tsx`銆傝€?Match 椤?`matchMock.ts`閲岀殑`mbti` 瀛楁鏄湡姝ｇ殑 16 绫?MBTI 瀛楁瘝浠ｇ爜锛坄ENFP` / `INTJ` / `INFP` / `INTP`锛夈€備袱濂楄瘝琛ㄥ畬鍏ㄤ笉鐩镐氦锛屽瓧娈靛悕涓嶅悓锛坄mbtiTypeEn`vs`mbti`锛夈€佺被鍨嬪潎涓鸿８ `string`锛孴ypeScript 涓嶄細鎷︽埅銆傛湭鏉?Match 鎺ュ叆浠撳簱鏃讹紝**绂佹**灏?`mbtiTypeEn` 涓?Match 鍗＄墖鐨?`mbti` 鐩存帴鍋氱浉绛夋瘮杈冩垨鍖归厤锛涗汉鏍煎尮閰嶅簲浣跨敤绫诲瀷瀹夊叏鐨?`personaId: PersonaId`銆? 2. **鍐椾綑瀛楁**锛歚TripSession.avatarKey` 涓?`personaId` 褰撳墠姘歌繙鍙栫浉鍚屽€硷紙`avatarKey: personaId`锛夈€傚湪纭鏄惁闇€瑕併€岃嚜瀹氫箟澶村儚瑕嗙洊銆嶈兘鍔涘墠锛屾帴鍏ユ柟搴斿皢涓よ€呰涓哄悓婧愭淳鐢燂紱濡傝鍒掓敮鎸佽嚜瀹氫箟澶村儚锛岄渶鍦ㄦ湰鍐崇瓥璁板綍琛ュ厖璇存槑锛屽惁鍒欏缓璁悗缁悎骞朵负鍗曚竴瀛楁銆? 3. **鏂囨。鎵胯 vs 鐜扮姸\*\*锛歚useTripStore.ts` 涓?`types/mbti.ts` 鐨勬敞閲婂０绉?Map 璇?`destination`銆丮atch 璇?`personaId` 鍋氬尮閰嶏紝浣嗚繖灞炰簬鏂囨。绾﹀畾锛屽綋鍓嶅皻鏈惤鍦颁负杩愯鏃堕泦鎴愩€侻atch 褰撳墠 100% 鐢?`matchMock.ts`椹卞姩锛屾湭瀵煎叆鏈粨搴撴垨`@/types/mbti`锛涙帴鍏ュ伐浣滈渶鍙﹁鎺掓湡骞跺湪钀藉湴鏃舵洿鏂版湰鍐崇瓥銆? 4. zustand 涓嶆槸鏂颁緷璧栵紙椤圭洰宸插湪鐢級锛屾湰娆℃柊澧炰笉瑙﹀彂銆屾柊澧炰緷璧栥€嶅喅绛栭」锛涜Е鍙戦」鏄法椤甸潰鍏变韩鐘舵€佺洰褰曚笌鍗忎綔褰卞搷銆?

### 2026-06-19 纭 TripKin 闈欐€?Demo 缁熶竴鏁存敼鑼冨洿

- 绫诲瀷锛氳矾鐢?/ 鍏变韩鐘舵€?/ 鍏ㄥ眬鏍峰紡 / 鍏叡缁勪欢 / 鍏朵粬
- 鑳屾櫙锛氬綋鍓?`/mbti`銆乣/map`銆乣/bottle`銆乣/match`銆乣/profile` 宸叉湁闈欐€侀〉闈紝浣嗛〉闈箣闂寸殑璺宠浆銆佺洰鐨勫湴涓婁笅鏂囥€佽韩浠戒綋绯诲拰瑙嗚瑙勫垯灏氭湭缁熶竴锛屽鏄撳嚭鐜扳€滃涓嫭绔嬮〉闈㈡嫾鍦ㄤ竴璧封€濈殑鍗忎綔闂銆傚洟闃熼渶瑕佷竴浠芥寮忔枃妗ｇ‘璁ゆ湰杞厛鍋氫粈涔堛€佸悗鍋氫粈涔堛€佸仛鍒颁粈涔堢畻杩囥€?- 鍐冲畾锛氭柊澧?historical note: demo fix scope has been merged into `docs/tripkin-product-prd.md` 浣滀负鏈疆闈欐€?Demo 缁熶竴鏁存敼鑼冨洿銆備富閾捐矾纭涓?`MBTI -> 鏃呰韬唤鍗?-> Map -> Bottle / Match -> Profile`銆傛暣鏀归『搴忎负锛氬厛淇烦杞拰鐩殑鍦颁笂涓嬫枃锛屽啀琛ラ〉闈㈠唴閮ㄤ氦浜掞紝鏈€鍚庣粺涓€瑙嗚鍜岀姸鎬佽〃杈俱€俙/map` 鍜?`/match` 鏆備綔涓虹粨鏋勪笌淇℃伅瀵嗗害鍙傝€冿紝浣嗕笉瑕佹眰鍏朵粬椤甸潰纭鍏ㄩ儴瑙嗚缁嗚妭銆?- 褰卞搷鑼冨洿锛氭墍鏈変富椤甸潰鐩綍锛坄src/pages/Mbti`銆乣src/pages/Map`銆乣src/pages/Bottle`銆乣src/pages/Match`銆乣src/pages/Profile`锛夈€佽法椤甸潰鍏变韩鐘舵€侊紙`src/store/useTripStore.ts`锛夈€佸叡浜被鍨嬶紙`src/types/mbti.ts`锛夈€佸悗缁彲鑳界‘璁ゅ鐢ㄧ殑鍏叡缁勪欢锛堜緥濡傝韩浠藉崱銆佹爣绛俱€佸簳閮ㄥ脊灞傦級浠ュ強 375px 绉诲姩绔獙鏀舵祦绋嬨€?- 鍚庣画娉ㄦ剰锛? 1. 棣栬疆鐩殑鍦颁笂涓嬫枃浼樺厛浣跨敤 URL query 鎴栫幇鏈?Zustand store 鎵挎帴锛屾帹鑽愯矾鐢辨牸寮忎负 `/bottle?dest=<鐩殑鍦癐D>` 鍜?`/match?dest=<鐩殑鍦癐D>`銆? 2. 棣栬疆鍩庡競绮掑害鍙鐩?`src/pages/Map/data/mapData.ts` 閲屽凡鏈夌殑 region/spot锛屼笉棰濆鎵╁睍鍏ㄩ噺鍩庡競搴撱€? 3. TripKin 鏃呰浜烘牸灞曠ず浠?`personaId` 涓哄噯锛屼笉瑕佹妸 `mbtiTypeEn` 褰撲綔 Match 鍗＄墖閲岀殑 16 鍨?MBTI 瀛楁瘝浣跨敤銆? 4. 椤甸潰绉佹湁缁勪欢鍏堢暀鍦ㄥ悇鑷〉闈㈢洰褰曪紱鍙湁韬唤鍗°€佹爣绛俱€佸簳閮ㄥ脊灞傜瓑纭璺ㄩ〉澶嶇敤鍚庯紝鍐嶆娊鍒?`src/components`銆? 5. 鏈疆浠嶄互闈欐€佸墠绔?Demo 涓轰富锛屼粎鍏佽 `server/` 涓嬬殑鏈€灏?mock API 楠ㄦ灦鐢ㄤ簬鍚庣画鑱旇皟锛涗笉寮曞叆鏁版嵁搴撱€佺櫥褰曘€佺湡瀹?AI銆佺湡瀹炶亰澶┿€佺湡瀹炰笂浼犮€佺湡瀹炲尮閰嶇畻娉曟垨鏂?UI 缁勪欢搴撱€?

### 2026-06-21 Converge TripKin design tokens to DESIGN.md

- Type: global style
- Background: `DESIGN.md` finalized TripKin typography, spacing, and radius tokens around the Map / Match / Bottle visual baseline. The previous global file still contained duplicate historical names and Profile had a private `--lv-*` token system.
- Decision: `src/styles/variables.less` now keeps the approved `font-*`, `space-*`, and `radius-*` scales, semantic color and shadow roles, gradients, Map rendering tokens, and Ant Design Mobile adapter variables. Historical global aliases such as `--font-size-*`, old radius aliases, `--color-input-bg`, `--glass-card-*`, and `--handle-color` are removed.
- Impact: global styles, Profile, Home, MBTI, Bottle, Map, Match, BottomNav, and MBTI entry modal styles.
- Follow-up: `--match-*` remains a Match-only baseline protection adapter, and `--map-*` remains map rendering data. Do not add page-specific token systems such as `--lv-*` in future work.

### 2026-06-21 Add shared base UI shells through Bottle pilot

- Type: shared components / collaboration rule
- Background: After the Home and Profile visual migration, `audit.md` recommends product-level QA and targeted polish instead of another broad token sweep. Bottle already had repeated page-shell patterns that are likely to recur across pages: a mobile top bar, modal bottom sheet shell, and empty/loading/error state.
- Decision: add `src/components/PageTopBar`, `src/components/BaseBottomSheet`, and `src/components/EmptyState` as small shared UI shells. Bottle is the first adopter. These components own only structural UI, tokenized surfaces, safe-area handling, modal semantics, and basic action slots.
- Impact: `src/components`, Bottle page shell code, and future pages that need the same base UI. Bottle business cards, bottle glyph, filters, tabs, form fields, and detail content remain page-local.
- Follow-up: do not migrate every page to these components mechanically. Reuse them only when a page already needs the same shell behavior; keep business-specific blocks inside the owning page directory.

### 2026-06-21 Prefer antd-mobile-backed base interactions

- Type: shared components / component library / collaboration rule
- Background: The Bottle pilot showed that fully hand-written shells and SVG icons can reduce consistency even when they avoid obvious component-library styling. The project already uses `antd-mobile` for `Popup`, `Tabs`, `TextArea`, and `Toast` in Match, Profile, and MBTI.
- Decision: standard mobile interactions should prefer antd-mobile-backed behavior, while TripKin CSS Modules keep control of page-level visual tone. Common UI icons should come from one explicit icon source after the dependency is declared; business symbols and page illustrations can stay custom.
- Impact: future work on `BaseBottomSheet`, `PageTopBar`, Bottle, Match, Profile, Map controls, and icon cleanup planning.
- Follow-up: see historical note: UI preview and antd-mobile strategy have been merged into `docs/antd-mobile-usage-guide.md`. Do not mechanically replace all cards, lists, or business visuals with antd-mobile defaults.

### 2026-06-21 Allow controlled visual improvement in UI migrations

- Type: shared components / component library / verification rule
- Background: The Bottle antd-mobile pilot clarified that “do not affect existing behavior” should not mean pixel-perfect visual freeze. The purpose of UI migration is to make standard mobile interactions feel more polished while preserving product flow.
- Decision: base interaction migrations may improve sheet motion, mask behavior, input feel, toast behavior, icon consistency, spacing, and touch states. They must keep business logic, data, route behavior, information order, and key actions unchanged, and they need baseline / after verification when browser testing is requested.
- Impact: Bottle pilot, future Profile sheet migration, Match/Profile reuse of `BaseBottomSheet`, and icon cleanup work.
- Follow-up: record baseline issues separately from regressions. If an antd-mobile-backed change makes a page look like a generic component demo, adjust CSS before expanding the pattern.

### 2026-06-21 Configure antd-mobile React 19 dynamic rendering

- Type: runtime compatibility / component library
- Background: Bottle's antd-mobile-backed `Popup` and `Toast` regression surfaced React 19 compatibility errors from dynamic containers that still expected the old ReactDOM unmount API.
- Decision: configure antd-mobile `unstableSetRender` once in `src/main.tsx` so dynamic containers use React 19 `createRoot` and `root.unmount()`.
- Impact: antd-mobile dynamic components such as `Popup`, `Toast`, `Dialog`, and future overlay-style components.
- Follow-up: keep this as a single app-entry compatibility adapter. Do not duplicate it in pages or shared UI shells.
````
