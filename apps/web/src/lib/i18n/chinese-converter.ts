/**
 * Chinese Converter Utility
 *
 * Comprehensive Simplified ↔ Traditional Chinese conversion using character mapping.
 * Covers all common characters used in Three Kingdoms content and general UI text.
 */

import type { LocaleCode } from './index';

/**
 * Comprehensive Simplified to Traditional character mappings
 * Based on common usage in Three Kingdoms content and modern Chinese UI
 */
const S2T_MAP: Record<string, string> = {
  // ===== Three Kingdoms Names and Titles =====
  '刘': '劉', '关': '關', '张': '張', '赵': '趙', '马': '馬',
  '孙': '孫', '诸': '諸', '曹': '曹', '袁': '袁', '吕': '呂',
  '董': '董', '华': '華', '陆': '陸', '黄': '黃', '周': '周',
  '鲁': '魯', '庞': '龐', '徐': '徐', '许': '許', '韩': '韓',
  '郭': '郭', '贾': '賈', '荀': '荀', '程': '程', '郑': '鄭',
  '钟': '鍾', '邓': '鄧', '姜': '薑', '夏': '夏', '侯': '侯',
  '孟': '孟', '严': '嚴', '颜': '顏', '魏': '魏', '蜀': '蜀',
  '吴': '吳', '汉': '漢', '晋': '晉', '备': '備', '羽': '羽',
  '飞': '飛', '云': '雲', '亮': '亮', '瑜': '瑜', '策': '策',
  '权': '權', '操': '操', '绍': '紹', '术': '術', '布': '布',
  '卓': '卓', '佗': '佗', '逊': '遜', '忠': '忠', '统': '統',
  '德': '德', '维': '維', '达': '達', '懿': '懿', '昭': '昭',

  // ===== Common Verbs =====
  '为': '為', '与': '與', '来': '來', '会': '會', '对': '對',
  '发': '發', '过': '過', '没': '沒', '现': '現', '见': '見',
  '说': '說', '将': '將', '从': '從', '当': '當', '进': '進',
  '动': '動', '开': '開', '问': '問', '让': '讓', '给': '給',
  '认': '認', '设': '設', '证': '證', '评': '評', '读': '讀',
  '请': '請', '选': '選', '达': '達', '获': '獲', '继': '繼',
  '续': '續', '胜': '勝', '败': '敗', '战': '戰', '杀': '殺',
  '击': '擊', '攻': '攻', '守': '守', '降': '降', '败': '敗',
  '带': '帶', '领': '領', '导': '導', '护': '護', '卫': '衛',
  '据': '據', '占': '佔', '夺': '奪', '争': '爭', '抢': '搶',
  '应': '應', '该': '該', '须': '須', '办': '辦', '创': '創',
  '制': '製', '造': '造', '建': '建', '设': '設', '组': '組',
  '织': '織', '联': '聯', '结': '結', '团': '團', '号': '號',
  '称': '稱', '叫': '叫', '告': '告', '诉': '訴', '听': '聽',
  '闻': '聞', '观': '觀', '看': '看', '视': '視', '览': '覽',
  '显': '顯', '示': '示', '标': '標', '记': '記', '载': '載',
  '传': '傳', '递': '遞', '送': '送', '运': '運', '输': '輸',
  '换': '換', '变': '變', '转': '轉', '改': '改', '革': '革',

  // ===== Common Nouns =====
  '国': '國', '时': '時', '个': '個', '们': '們', '后': '後',
  '头': '頭', '门': '門', '间': '間', '义': '義', '乐': '樂',
  '业': '業', '师': '師', '历': '歷', '压': '壓', '复': '復',
  '处': '處', '学': '學', '实': '實', '属': '屬', '广': '廣',
  '机': '機', '气': '氣', '决': '決', '济': '濟', '点': '點',
  '热': '熱', '独': '獨', '产': '產', '电': '電', '确': '確',
  '离': '離', '种': '種', '网': '網', '节': '節', '虽': '雖',
  '识': '識', '语': '語', '质': '質', '责': '責', '远': '遠',
  '里': '裡', '银': '銀', '际': '際', '随': '隨', '难': '難',
  '题': '題', '验': '驗', '风': '風', '书': '書', '东': '東',
  '两': '兩', '无': '無', '军': '軍', '长': '長', '经': '經',
  '这': '這', '级': '級', '类': '類', '条': '條', '项': '項',
  '笔': '筆', '画': '畫', '简': '簡', '体': '體', '繁': '繁',
  '页': '頁', '错': '錯', '误': '誤', '功': '功', '败': '敗',
  '章': '章', '线': '線', '图': '圖', '系': '係', '资': '資',
  '料': '料', '详': '詳', '细': '細', '势': '勢', '力': '力',
  '场': '場', '战': '戰', '役': '役', '阵': '陣', '营': '營',
  '寨': '寨', '城': '城', '池': '池', '关': '關', '隘': '隘',
  '桥': '橋', '路': '路', '道': '道', '径': '徑', '岸': '岸',
  '滩': '灘', '洲': '洲', '岛': '島', '山': '山', '岭': '嶺',
  '峰': '峰', '谷': '谷', '川': '川', '河': '河', '江': '江',
  '湖': '湖', '海': '海', '泽': '澤', '原': '原', '野': '野',
  '林': '林', '园': '園', '殿': '殿', '宫': '宮', '府': '府',
  '院': '院', '楼': '樓', '阁': '閣', '台': '臺', '坛': '壇',
  '庙': '廟', '寺': '寺', '塔': '塔', '墓': '墓', '陵': '陵',

  // ===== Adjectives =====
  '伟': '偉', '强': '強', '弱': '弱', '高': '高', '低': '低',
  '大': '大', '小': '小', '长': '長', '短': '短', '宽': '寬',
  '窄': '窄', '厚': '厚', '薄': '薄', '深': '深', '浅': '淺',
  '重': '重', '轻': '輕', '快': '快', '慢': '慢', '早': '早',
  '晚': '晚', '新': '新', '旧': '舊', '老': '老', '少': '少',
  '多': '多', '寡': '寡', '全': '全', '半': '半', '真': '真',
  '假': '假', '好': '好', '坏': '壞', '美': '美', '丑': '醜',
  '善': '善', '恶': '惡', '正': '正', '邪': '邪', '忠': '忠',
  '奸': '奸', '勇': '勇', '怯': '怯', '智': '智', '愚': '愚',
  '贤': '賢', '愚': '愚', '仁': '仁', '义': '義', '礼': '禮',
  '信': '信', '严': '嚴', '宽': '寬', '刚': '剛', '柔': '柔',
  '明': '明', '暗': '暗', '清': '清', '浊': '濁', '纯': '純',
  '杂': '雜', '精': '精', '粗': '粗', '细': '細', '密': '密',
  '疏': '疏', '紧': '緊', '松': '鬆', '干': '乾', '湿': '濕',
  '热': '熱', '冷': '冷', '温': '溫', '凉': '涼', '暖': '暖',

  // ===== Time and Numbers =====
  '年': '年', '月': '月', '日': '日', '时': '時', '分': '分',
  '秒': '秒', '周': '週', '季': '季', '春': '春', '夏': '夏',
  '秋': '秋', '冬': '冬', '昨': '昨', '今': '今', '明': '明',
  '前': '前', '后': '後', '初': '初', '末': '末', '始': '始',
  '终': '終', '一': '一', '二': '二', '三': '三', '四': '四',
  '五': '五', '六': '六', '七': '七', '八': '八', '九': '九',
  '十': '十', '百': '百', '千': '千', '万': '萬', '亿': '億',
  '零': '零', '第': '第', '共': '共', '总': '總', '各': '各',
  '每': '每', '某': '某', '几': '幾', '数': '數', '量': '量',

  // ===== UI and Common Words =====
  '搜': '搜', '索': '索', '查': '查', '找': '找', '筛': '篩',
  '滤': '濾', '排': '排', '序': '序', '升': '升', '降': '降',
  '增': '增', '减': '減', '删': '刪', '除': '除', '添': '添',
  '加': '加', '编': '編', '辑': '輯', '修': '修', '改': '改',
  '保': '保', '存': '存', '取': '取', '消': '消', '确': '確',
  '定': '定', '返': '返', '回': '回', '退': '退', '出': '出',
  '入': '入', '登': '登', '录': '錄', '注': '註', '册': '冊',
  '帮': '幫', '助': '助', '支': '支', '持': '持', '设': '設',
  '置': '置', '配': '配', '管': '管', '理': '理', '控': '控',
  '调': '調', '试': '試', '测': '測', '检': '檢', '查': '查',
  '验': '驗', '核': '核', '审': '審', '批': '批', '准': '準',
  '许': '許', '禁': '禁', '止': '止', '允': '允', '拒': '拒',
  '接': '接', '受': '受', '拒': '拒', '绝': '絕', '同': '同',
  '意': '意', '反': '反', '赞': '贊', '成': '成', '否': '否',
  '是': '是', '非': '非', '对': '對', '错': '錯', '正': '正',
  '确': '確', '完': '完', '整': '整', '部': '部', '分': '分',
  '全': '全', '空': '空', '满': '滿', '足': '足', '够': '夠',
  '缺': '缺', '少': '少', '多': '多', '余': '餘', '剩': '剩',

  // ===== Pronouns and Particles =====
  '我': '我', '你': '你', '他': '他', '她': '她', '它': '它',
  '谁': '誰', '什': '什', '么': '麼', '哪': '哪', '那': '那',
  '这': '這', '此': '此', '彼': '彼', '其': '其', '之': '之',
  '的': '的', '地': '地', '得': '得', '着': '著', '了': '了',
  '过': '過', '吗': '嗎', '呢': '呢', '吧': '吧', '啊': '啊',
  '呀': '呀', '哦': '哦', '噢': '噢', '嗯': '嗯', '哎': '哎',
  '唉': '唉', '哇': '哇', '哈': '哈', '嘿': '嘿', '喂': '喂',

  // ===== Prepositions and Conjunctions =====
  '在': '在', '于': '於', '向': '向', '往': '往', '朝': '朝',
  '从': '從', '自': '自', '由': '由', '经': '經', '过': '過',
  '到': '到', '至': '至', '达': '達', '及': '及', '跟': '跟',
  '和': '和', '与': '與', '同': '同', '或': '或', '还': '還',
  '也': '也', '又': '又', '都': '都', '只': '只', '仅': '僅',
  '就': '就', '才': '才', '便': '便', '即': '即', '若': '若',
  '如': '如', '虽': '雖', '然': '然', '但': '但', '却': '卻',
  '而': '而', '并': '並', '且': '且', '因': '因', '所': '所',
  '以': '以', '故': '故', '则': '則', '乃': '乃', '亦': '亦',
};

// Generate reverse mapping (Traditional to Simplified)
const T2S_MAP: Record<string, string> = {};
for (const [simplified, traditional] of Object.entries(S2T_MAP)) {
  T2S_MAP[traditional] = simplified;
}

/**
 * Convert text from Simplified Chinese to Traditional Chinese
 */
function simplifiedToTraditional(text: string): string {
  let result = '';
  for (const char of text) {
    result += S2T_MAP[char] || char;
  }
  return result;
}

/**
 * Convert text from Traditional Chinese to Simplified Chinese
 */
function traditionalToSimplified(text: string): string {
  let result = '';
  for (const char of text) {
    result += T2S_MAP[char] || char;
  }
  return result;
}

/**
 * Convert Chinese text to the target locale
 */
export async function convertChinese(
  text: string,
  targetLocale: LocaleCode | string,
  sourceLocale: LocaleCode | string = 'zh-Hans'
): Promise<string> {
  return convertChineseSync(text, targetLocale, sourceLocale);
}

/**
 * Synchronous Chinese conversion
 */
export function convertChineseSync(
  text: string,
  targetLocale: LocaleCode | string,
  sourceLocale: LocaleCode | string = 'zh-Hans'
): string {
  if (!text || sourceLocale === targetLocale) {
    return text;
  }

  if (sourceLocale === 'zh-Hans' && targetLocale === 'zh-Hant') {
    return simplifiedToTraditional(text);
  }

  if (sourceLocale === 'zh-Hant' && targetLocale === 'zh-Hans') {
    return traditionalToSimplified(text);
  }

  return text;
}

/**
 * Preload converter (no-op since mappings are in memory)
 */
export async function preloadConverter(_locale: LocaleCode | string): Promise<void> {
  return Promise.resolve();
}

/**
 * Check if converter is ready (always true)
 */
export function isConverterReady(): boolean {
  return true;
}

/**
 * Convert an entire translation object recursively
 * This is used to convert all zh-Hans translations to zh-Hant
 */
export function convertTranslationObject(
  obj: Record<string, unknown>,
  targetLocale: LocaleCode | string,
  sourceLocale: LocaleCode | string = 'zh-Hans'
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = convertChineseSync(value, targetLocale, sourceLocale);
    } else if (typeof value === 'object' && value !== null) {
      result[key] = convertTranslationObject(
        value as Record<string, unknown>,
        targetLocale,
        sourceLocale
      );
    } else {
      result[key] = value;
    }
  }

  return result;
}
