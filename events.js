// ⚡ 突發事件池：黑天鵝天災
const randomDisasters = [
    { name: "關中大地震", desc: "華縣級別特大地震爆發，山崩地裂，京畿震盪，人心惶惶。", effects: { politics: -5, economy: -15, defense: -5 } },
    { name: "黃河百年大決堤", desc: "大水席捲中原三省，百萬良田化為汪洋，饑民塞道。", effects: { politics: -10, economy: -20, defense: 0 } },
    { name: "江南大飛蝗災", desc: "蝗蟲遮天蔽日，百里無青草，秋收顆粒無收，糧價暴漲。", effects: { politics: 0, economy: -25, defense: -5 } },
    { name: "腺鼠疫烈性爆發", desc: "京師與軍營爆發恐怖瘟疫，士兵平民大批吐血癱倒，防務空虛。", effects: { politics: -5, economy: -10, defense: -20 } },
    { name: "極寒小冰河期", desc: "全國糧食產量連續三年銳減，北方牧場全面凍結，異族南下意願暴增。", effects: { politics: -5, economy: -15, defense: -10 } }
];

// 🏛️ 獨立核心事件池
const gameEvents = [
    // === 【開國池】 ===
    {
        id: 1, tags: ["開國"],
        title: "🌾 【稅制】新朝初立，天下凋敝，如何確立財政稅法基礎？",
        description: "大華解脫前朝亂世，戶口銳減。此時必須確立稅制基礎，三朝智囊各獻其策：",
        advisors: [
            { name: "【漢初黃老派】丞相 曹興", quote: "與民休息，輕徭薄賦！推行『三十稅一』，官府治而不為。", effects: { politics: 10, economy: 20, defense: -15, culture: 5 }, historicalNote: "<b>🌱 鏡鑑：</b>西漢文景之治核心。極大恢復民間經濟活力，但中央軍隊初期偏弱。" },
            { name: "【唐代租庸調派】戶部尚書 宇文泰", quote: "以人頭為本，推行『租庸調法』！實物徵收，穩定中央。", effects: { politics: 15, economy: 10, defense: 10, culture: 0 }, historicalNote: "<b>🌱 鏡鑑：</b>隋唐前期經濟基石，提供穩定的物資與兵源保障。" },
            { name: "【明初重農派】御史大夫 朱開國", quote: "編制『黃冊魚鱗圖冊』！嚴厲打擊豪強商人逃稅！", effects: { politics: 20, economy: 5, defense: 5, culture: -15 }, historicalNote: "<b>🌱 鏡鑑：</b>明太祖鐵腕集權。政治掌控極強，但極端重農抑商壓制了文化與商業。" }
        ]
    },
    {
        id: 2, tags: ["開國"],
        title: "⚙️ 【選官】元勳宿將把持朝政，如何選拔新血入仕？",
        description: "建國後朝廷急需建立公平的官吏選拔體制，以打破功臣與地方世族的壟斷：",
        advisors: [
            { name: "【漢代察舉派】太學五經正 董正", quote: "令各郡國每年推舉『孝子』與『廉吏』，由朝廷考核授官。", effects: { politics: 10, economy: 0, defense: -5, culture: 20 }, historicalNote: "<b>🌱 鏡鑑：</b>西漢察舉制。確立儒家正統，但中後期易被地方門閥壟斷。" },
            { name: "【魏晉九品派】吏部尚書 放星", quote: "設『大中正』官，依據出身門第、品行才德，定九等錄用。", effects: { politics: -15, economy: 5, defense: 5, culture: 15 }, historicalNote: "<b>🌱 鏡鑑：</b>曹魏九品中正制。拉攏了士族，但導致「上品無寒門」，政治光速硬化。" },
            { name: "【隋唐科舉派】內史令 楊明", quote: "徹底廢除地方推薦！開設『進士科』，憑分數定高下！", effects: { politics: 25, economy: -5, defense: 0, culture: 15 }, historicalNote: "<b>🌱 鏡鑑：</b>隋唐科舉制。打破血緣壟斷，極大強化皇權與社會流動性。" }
        ]
    },
    {
        id: 3, tags: ["開國"],
        title: "⚔️ 【兵制】百萬大軍的軍費成了沉重負擔，如何改制？",
        description: "開國軍隊數量龐大，長年消耗國庫。如何在不降低安全的前提下解決軍費問題？",
        advisors: [
            { name: "【唐初府兵派】大將軍 李衛", quote: "推行『兵農合一』！給戰士分撥均田，免其租稅，自備兵仗。", effects: { politics: 15, economy: 15, defense: 10, culture: 0 }, historicalNote: "<b>🌱 鏡鑑：</b>西魏至唐初府兵制。國家不花軍餉即可維持強大軍隊。" },
            { name: "【北宋募兵派】樞密使 趙匡國", quote: "強悍之徒收編入中央『禁軍』，由朝廷專業養兵。地方不留精兵。", effects: { politics: 20, economy: -25, defense: 5, culture: 5 }, historicalNote: "<b>🌱 鏡鑑：</b>北宋養兵制。消除了地方造反可能，但造成了恐怖的「冗兵」財政黑洞。" },
            { name: "【明代衛所派】誠意伯 劉基誠", quote: "推行『衛所制』，軍戶世代相襲，『三分守城，七分屯田』。", effects: { politics: 10, economy: 10, defense: -20, culture: 0 }, historicalNote: "<b>🌱 鏡鑑：</b>明代衛所制。後期軍戶土地被兼併，軍隊戰鬥力光速崩潰。" }
        ]
    },

    // === 【鼎盛池】 ===
    {
        id: 4, tags: ["鼎盛"],
        title: "💰 【財政】步入盛世開支劇增，富商大肆隱匿財產，如何充實國庫？",
        description: "大型工程與對外武功開支浩繁。地方豪強卻瘋狂逃稅，財政出現缺口：",
        advisors: [
            { name: "【漢代官營派】大司農 桑弘", quote: "將『鹽、鐵、酒』等暴利行業收歸官府壟斷，不加賦而國用足！", effects: { politics: 10, economy: 30, defense: 5, culture: -15 }, historicalNote: "<b>☀️ 鏡鑑：</b>西漢鹽鐵官營。國庫暴增，但官營產品粗製濫造，實質是與民爭利。" },
            { name: "【唐代兩稅法】宰相 楊炎之", quote: "改推『兩稅法』！一律按資產、田畝一年分夏秋徵收。", effects: { politics: 15, economy: 25, defense: 0, culture: 5 }, historicalNote: "<b>☀️ 鏡鑑：</b>中唐兩稅法。稅制從「向人課稅」轉向「向物課稅」的巨大進步。" },
            { name: "【宋代新法派】參知政事 王安", quote: "推行『方田均稅法』與『青苗法』由官府低息貸款給農民！", effects: { politics: -20, economy: 20, defense: 10, culture: -5 }, historicalNote: "<b>☀️ 鏡鑑：</b>王安石變法。立意雖好但基層執行走樣，且引發了嚴重的黨爭內耗。" }
        ]
    },
    {
        id: 5, tags: ["鼎盛"],
        title: "⚔️ 【邊防】北方游牧帝國崛起，鐵騎頻繁叩關，如何應對？",
        description: "邊疆烽火連天，北方強敵集結十萬騎兵南下，朝廷必須做出戰略抉擇：",
        advisors: [
            { name: "【漢武征伐派】大司馬 衛青雲", quote: "財政既已充盈，理當主動出擊！長途奔襲，犁庭掃穴！", effects: { politics: 5, economy: -35, defense: 40, culture: 5 }, historicalNote: "<b>☀️ 鏡鑑：</b>漢武帝反擊匈奴。打出了華夏武功巔峰，但長途總體戰也幾乎耗盡國庫。" },
            { name: "【漢初和親派】奉常 婁敬之", quote: "以宗室公主下嫁，每年贈送大批白銀繒雪，換取和平。", effects: { politics: -5, economy: -10, defense: -20, culture: 10 }, historicalNote: "<b>☀️ 鏡鑑：</b>西漢初期和親。贏得喘息時間，但長期委曲求全導致邊防廢弛。" },
            { name: "【宋代歲幣派】宰相 寇準國", quote: "御駕親征後簽訂條約，每年賜予『歲幣』，邊境開展互市貿易。", effects: { politics: 20, economy: -15, defense: 5, culture: 15 }, historicalNote: "<b>☀️ 鏡鑑：</b>北宋澶淵之盟。歲幣開支遠低於軍費，換來百年和平，商品經濟大繁榮。" }
        ]
    },

    // === 【守成池】 ===
    {
        id: 6, tags: ["守成"],
        title: "📜 【宗教】域外佛教盛行，僧侶逃避賦稅兼併土地，如何處置？",
        description: "大量人口出家逃避徭役，寺廟瘋狂兼併土地，侵蝕國庫稅基：",
        advisors: [
            { name: "【唐代滅佛派】吏部侍郎 韓愈之", quote: "臣請發動『滅佛』，強制僧尼還俗務農，拆毀寺廟熔銅鑄錢！", effects: { politics: 15, economy: 30, defense: 0, culture: -25 }, historicalNote: "<b>⚖️ 鏡鑑：</b>三武一宗滅佛。短期釋放財政與勞動力，但重創了宗教文物。" },
            { name: "【梁武帝護法派】侍中 蕭崇", quote: "陛下應當『大興佛寺』，親自捨身護法，以慈悲治理天下。", effects: { politics: -20, economy: -30, defense: -20, culture: 30 }, historicalNote: "<b>⚖️ 鏡鑑：</b>南朝梁武帝佞佛。搞垮了國家財政，最終引發侯景之亂。" },
            { name: "【明清控制派】禮部尚書 曾理", quote: "設立官方官方發放度牒限制人數。大力宣揚理學思想。", effects: { politics: 25, economy: 5, defense: 0, culture: 10 }, historicalNote: "<b>⚖️ 鏡鑑：</b>明清思想控制。政治極穩固，但將學術與社會思想全面僵化。" }
        ]
    },
    {
        id: 7, tags: ["守成"],
        title: "🪙 【貨幣】商品經濟發達造成『錢荒』，金屬銅幣供不應求，如何變革？",
        description: "市面上流通的金屬貨幣嚴重不足，嚴重阻礙了大宗物資貿易通暢：",
        advisors: [
            { name: "【宋代紙幣派】益州知州 益交", quote: "由官府與富商聯合發行世界上最早的紙幣——『交子』！", effects: { politics: 5, economy: 35, defense: 0, culture: 10 }, historicalNote: "<b>⚖️ 鏡鑑：</b>北宋交子。降低交易成本引爆經濟，但後期易引發惡性通脹。" },
            { name: "【明代白銀派】戶部尚書 張銀", quote: "順應民間貿易趨勢，將『白銀』確立為法定貨幣，大小稅賦折銀！", effects: { politics: 20, economy: 25, defense: 5, culture: 5 }, historicalNote: "<b>⚖️ 鏡鑑：</b>明中葉張居正一條鞭法。賦稅簡化，促進農產品商品化。" },
            { name: "【漢代五銖錢派】上林三官 上林", quote: "嚴禁民間私鑄！鑄幣權收歸中央，統一鑄造標準『五銖錢』。", effects: { politics: 25, economy: 20, defense: 0, culture: 0 }, historicalNote: "<b>⚖️ 鏡鑑：</b>漢武帝金融集權。穩定了華夏兩千年的金屬貨幣金融基石。" }
        ]
    },

    // === 【中衰池】 ===
    {
        id: 8, tags: ["中衰"],
        title: "⚖️ 【朋黨】朝中文官因學術理念與政見不同分裂為兩派，互相傾軋！",
        description: "朝堂撕裂，官員見黨即攻，所有國家大政方針均淪為朋黨政爭的工具：",
        advisors: [
            { name: "【唐代牛李黨爭】吏部尚書 牛僧", quote: "扶植科舉出身的寒門進士組成『牛黨』，全力罷免世家權貴！", effects: { politics: -30, economy: -10, defense: -10, culture: 10 }, historicalNote: "<b>⚡ 鏡鑑：</b>晚唐牛李黨爭。朝堂內耗四十年，導致中樞政治徹底癱瘓。" },
            { name: "【明末東林黨爭】大理寺評事 顧東", quote: "支持民間書院講學的『東林清流』，痛斥朝中大臣皆為諂媚小人！", effects: { politics: -35, economy: -5, defense: -15, culture: 15 }, historicalNote: "<b>⚡ 鏡鑑：</b>晚明東林黨爭。陷入非黑即白的道德口水戰，內耗至亡國。" },
            { name: "【北宋君子黨論】翰林學士 歐陽", quote: "君子以同道為朋。陛下應當辨明忠奸，重用正義之黨！", effects: { politics: 10, economy: -5, defense: 0, culture: 30 }, historicalNote: "<b>⚡ 鏡鑑：</b>北宋新舊黨爭背景。雖然提高了文人氣節，但依舊引發政策清算。" }
        ]
    },
    {
        id: 9, tags: ["中衰"],
        title: "🌾 【兼併】土地兼併達到頂峰，豪強隱匿人口，基層稅源乾涸！",
        description: "九成土地已落入勳貴手中，國家統計丁口銳減，面臨財政生死邊緣：",
        advisors: [
            { name: "【明代考成法】內閣首輔 張居", quote: "嚴考核百官效率，清查土地全面推行『一條鞭法』！", effects: { politics: 25, economy: 30, defense: 5, culture: -15 }, historicalNote: "<b>⚡ 鏡鑑：</b>萬曆張居正改革。以鐵腕整頓吏治清查漏稅，極大地為明朝續命。" },
            { name: "【王莽復古限田】新都侯 王莽年", quote: "全面復古！土地改名為『王田』禁止買賣，按人頭平均分配！", effects: { politics: -40, economy: -35, defense: -15, culture: 20 }, historicalNote: "<b>⚡ 鏡鑑：</b>新朝王莽改制。極端理想主義違背經濟規律，引發狂瀾。" },
            { name: "【清代攤丁入畝】戶部尚書 田文", quote: "徹底廢除人頭稅！推行『攤丁入畝』，沒田不交稅，田多者多交税！", effects: { politics: 20, economy: 30, defense: 0, culture: 5 }, historicalNote: "<b>⚡ 鏡鑑：</b>清代雍正改革。解除了人身依附禁錮，促成近代人口爆發。" }
        ]
    },
    {
        id: 10, tags: ["中衰"],
        title: "👑 【終局大決戰】命運之弦，二十萬敵軍兵臨城下，大華最後的抉擇？",
        description: "這是大華帝國面臨的最後考驗。城內精兵不足萬人，局勢已無可挽回：",
        advisors: [
            { name: "【明思宗殉國】大華天子 皇帝自己", quote: "朕將『君王死社稷』，自縊於景山，絕不投降，保全尊嚴！", effects: { politics: -50, economy: -50, defense: -50, culture: 40 }, historicalNote: "<b>⚡ 鏡鑑：</b>崇禎皇帝煤山自縊。保全了天子的氣節與華夏傲骨。" },
            { name: "【南宋少帝投海】左丞相 陸秀", quote: "集結最後的軍民，在崖山展開海上決戰，與國同殉！", effects: { politics: -50, economy: -50, defense: -50, culture: 50 }, historicalNote: "<b>⚡ 鏡鑑：</b>宋末崖山海戰。陸秀夫背少帝投海，十萬軍民同殉，展現極致氣節。" },
            { name: "【明末引狼入室】遼東總兵 吳三", quote: "大開山海關門，引北方鐵騎入關平定流寇，向其俯首稱臣！", effects: { politics: -50, economy: -50, defense: -50, culture: -50 }, historicalNote: "<b>⚡ 鏡鑑：</b>吳三桂引清兵入關。藉由外族粉碎內地民變，但也導致神州易主。" }
        ]
    }
];
