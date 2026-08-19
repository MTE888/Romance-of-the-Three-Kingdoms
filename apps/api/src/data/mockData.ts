/**
 * Mock Data for Three Kingdoms Platform
 *
 * Provides comprehensive mock data for development without requiring PostgreSQL.
 * All data follows the Prisma schema structure.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// TYPES
// ============================================================================

export type Kingdom = 'WEI' | 'SHU' | 'WU' | 'HAN' | 'OTHER';
export type SourceType = 'NOVEL' | 'HISTORY' | 'ANALYSIS' | 'ARTWORK' | 'MAP';
export type ReliabilityTier = 'PRIMARY' | 'SECONDARY' | 'TERTIARY' | 'FICTION';
export type RelationshipType = 'SWORN_BROTHER' | 'FAMILY' | 'SPOUSE' | 'PARENT_CHILD' | 'LORD_VASSAL' | 'FRIEND' | 'RIVAL' | 'ENEMY' | 'MENTOR_STUDENT';
export type RelationshipSource = 'HISTORICAL' | 'LITERARY' | 'BOTH';
export type EventType = 'BATTLE' | 'POLITICAL' | 'PERSONAL' | 'NATURAL' | 'CULTURAL';
export type DatePrecision = 'EXACT' | 'APPROXIMATE' | 'ERA';

export interface MultilingualString {
  zh: string;
  en?: string;
}

export interface Source {
  id: string;
  type: SourceType;
  title: MultilingualString;
  author?: MultilingualString;
  era?: string;
  language: string;
  reliability: ReliabilityTier;
  description: MultilingualString;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  name: MultilingualString;
  modernName?: MultilingualString;
  type: 'CITY' | 'PROVINCE' | 'BATTLEFIELD' | 'LANDMARK';
  coordinates?: { latitude: number; longitude: number };
  region?: string;
  controllingKingdom?: string;
  historicalSignificance?: MultilingualString;
  description?: MultilingualString;
  images: any[];
  createdAt: Date;
}

export interface Character {
  id: string;
  canonicalName: MultilingualString;
  courtesyName?: MultilingualString;
  aliases: MultilingualString[];
  birthYear?: number;
  deathYear?: number;
  birthLocationId?: string;
  kingdom: Kingdom;
  socialClass?: string;
  occupations: string[];
  historicalProfile: {
    summary: MultilingualString;
    personalityTraits: string[];
    achievements: string[];
    sources: string[];
  };
  literaryProfile: {
    summary: MultilingualString;
    personalityTraits: string[];
    famousScenes: string[];
    sources: string[];
  };
  biography?: MultilingualString;
  images: any[];
  quotes: any[];
  verified: boolean;
  verificationNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  birthLocation?: Location;
}

export interface CharacterRelationship {
  id: string;
  characterAId: string;
  characterBId: string;
  relationshipType: RelationshipType;
  relationshipSource: RelationshipSource;
  sources: string[];
  startYear?: number;
  endYear?: number;
  description?: MultilingualString;
  strength: number;
  isReciprocal: boolean;
  createdAt: Date;
  characterA?: Character;
  characterB?: Character;
}

export interface Event {
  id: string;
  name: MultilingualString;
  type: EventType;
  dateYear: number;
  dateMonth?: number;
  dateDay?: number;
  datePrecision: DatePrecision;
  durationDays?: number;
  locationId?: string;
  description: MultilingualString;
  significance?: MultilingualString;
  historicalAccount?: any;
  literaryAccount?: any;
  participants: any[];
  outcomes: any[];
  leadsToEventIds: string[];
  createdAt: Date;
  updatedAt: Date;
  location?: Location;
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: MultilingualString;
  content: MultilingualString;
  summary?: MultilingualString;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineEntry {
  id: string;
  year: number;
  month?: number;
  day?: number;
  eventId?: string;
  characterId?: string;
  description?: MultilingualString;
  importance: number;
  category?: string;
  createdAt: Date;
  event?: Event;
  character?: Character;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const now = new Date();

// Sources
export const sources: Source[] = [
  {
    id: 'source-sanguo-zhi',
    type: 'HISTORY',
    title: { zh: '三国志', en: 'Records of the Three Kingdoms' },
    author: { zh: '陈寿', en: 'Chen Shou' },
    era: '3rd century',
    language: 'zh',
    reliability: 'PRIMARY',
    description: { zh: '三国时期的官方史书', en: 'Official historical records of the Three Kingdoms period' },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'source-sanguo-yanyi',
    type: 'NOVEL',
    title: { zh: '三国演义', en: 'Romance of the Three Kingdoms' },
    author: { zh: '罗贯中', en: 'Luo Guanzhong' },
    era: '14th century',
    language: 'zh',
    reliability: 'FICTION',
    description: { zh: '中国古典四大名著之一', en: 'One of the Four Great Classical Novels of Chinese literature' },
    createdAt: now,
    updatedAt: now,
  },
];

// Locations
export const locations: Location[] = [
  {
    id: 'loc-luoyang',
    name: { zh: '洛阳', en: 'Luoyang' },
    modernName: { zh: '洛阳市', en: 'Luoyang City' },
    type: 'CITY',
    coordinates: { latitude: 34.6836, longitude: 112.4536 },
    region: '河南',
    controllingKingdom: 'HAN',
    historicalSignificance: { zh: '东汉都城', en: 'Capital of Eastern Han Dynasty' },
    description: { zh: '东汉王朝的政治中心', en: 'Political center of the Eastern Han Dynasty' },
    images: [],
    createdAt: now,
  },
  {
    id: 'loc-chengdu',
    name: { zh: '成都', en: 'Chengdu' },
    modernName: { zh: '成都市', en: 'Chengdu City' },
    type: 'CITY',
    coordinates: { latitude: 30.5728, longitude: 104.0668 },
    region: '四川',
    controllingKingdom: 'SHU',
    historicalSignificance: { zh: '蜀汉都城', en: 'Capital of Shu Han' },
    description: { zh: '刘备建立蜀汉的首都', en: 'Capital established by Liu Bei for Shu Han' },
    images: [],
    createdAt: now,
  },
  {
    id: 'loc-jianye',
    name: { zh: '建业', en: 'Jianye' },
    modernName: { zh: '南京市', en: 'Nanjing City' },
    type: 'CITY',
    coordinates: { latitude: 32.0603, longitude: 118.7969 },
    region: '江苏',
    controllingKingdom: 'WU',
    historicalSignificance: { zh: '东吴都城', en: 'Capital of Eastern Wu' },
    description: { zh: '孙权建立东吴的首都', en: 'Capital established by Sun Quan for Eastern Wu' },
    images: [],
    createdAt: now,
  },
  {
    id: 'loc-xuchang',
    name: { zh: '许昌', en: 'Xuchang' },
    modernName: { zh: '许昌市', en: 'Xuchang City' },
    type: 'CITY',
    coordinates: { latitude: 34.0268, longitude: 113.8520 },
    region: '河南',
    controllingKingdom: 'WEI',
    historicalSignificance: { zh: '曹魏都城', en: 'Capital of Cao Wei' },
    description: { zh: '曹操迎汉献帝后的政治中心', en: 'Political center after Cao Cao received Emperor Xian' },
    images: [],
    createdAt: now,
  },
  {
    id: 'loc-chibi',
    name: { zh: '赤壁', en: 'Red Cliffs' },
    modernName: { zh: '赤壁市', en: 'Chibi City' },
    type: 'BATTLEFIELD',
    coordinates: { latitude: 29.7258, longitude: 113.9003 },
    region: '湖北',
    historicalSignificance: { zh: '赤壁之战古战场', en: 'Site of the Battle of Red Cliffs' },
    description: { zh: '三国时期最著名的战役发生地', en: 'Site of the most famous battle of the Three Kingdoms period' },
    images: [],
    createdAt: now,
  },
];

// Characters
export const characters: Character[] = [
  {
    id: 'liu-bei',
    canonicalName: { zh: '刘备', en: 'Liu Bei' },
    courtesyName: { zh: '玄德', en: 'Xuande' },
    aliases: [{ zh: '刘皇叔', en: 'Imperial Uncle Liu' }],
    birthYear: 161,
    deathYear: 223,
    birthLocationId: 'loc-zhuo',
    kingdom: 'SHU',
    socialClass: 'Nobility (claimed)',
    occupations: ['Emperor', 'Warlord', 'Merchant (straw sandals)'],
    historicalProfile: {
      summary: {
        zh: '蜀汉开国皇帝，汉室宗亲。以仁德著称，善于用人。',
        en: 'Founding emperor of Shu Han, claimed descendant of Han royalty. Known for benevolence and ability to attract talent.'
      },
      personalityTraits: ['仁厚', '坚韧', '善于用人'],
      achievements: ['建立蜀汉', '三顾茅庐请诸葛亮', '夷陵之战前统一益州'],
      sources: ['source-sanguo-zhi'],
    },
    literaryProfile: {
      summary: {
        zh: '三国演义中的仁义之君，桃园三结义的大哥，以匡扶汉室为己任。',
        en: 'The benevolent lord in Romance of Three Kingdoms, eldest sworn brother of Peach Garden Oath, devoted to restoring the Han Dynasty.'
      },
      personalityTraits: ['仁义', '爱哭', '重情义'],
      famousScenes: ['桃园三结义', '三顾茅庐', '白帝城托孤', '携民渡江'],
      sources: ['source-sanguo-yanyi'],
    },
    biography: {
      zh: '刘备字玄德，涿郡涿县人，汉景帝之子中山靖王刘胜的后代。少时家贫，与母亲织席贩履为业。',
      en: 'Liu Bei, courtesy name Xuande, was from Zhuo County. He claimed descent from Liu Sheng, Prince of Zhongshan, son of Emperor Jing of Han.'
    },
    images: [],
    quotes: [
      { zh: '勿以恶小而为之，勿以善小而不为。', en: 'Do not do evil because it is small; do not neglect good because it is small.', source: '遗诏' },
    ],
    verified: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'guan-yu',
    canonicalName: { zh: '关羽', en: 'Guan Yu' },
    courtesyName: { zh: '云长', en: 'Yunchang' },
    aliases: [{ zh: '关公', en: 'Lord Guan' }, { zh: '美髯公', en: 'Lord of the Magnificent Beard' }],
    birthYear: 160,
    deathYear: 220,
    kingdom: 'SHU',
    socialClass: 'Commoner',
    occupations: ['General', 'Governor'],
    historicalProfile: {
      summary: {
        zh: '蜀汉名将，与张飞并称万人敌。后被孙权擒杀。',
        en: 'Famous general of Shu Han, known alongside Zhang Fei as worth ten thousand men. Later captured and killed by Sun Quan.'
      },
      personalityTraits: ['勇猛', '忠义', '傲慢'],
      achievements: ['斩颜良', '水淹七军', '威震华夏'],
      sources: ['source-sanguo-zhi'],
    },
    literaryProfile: {
      summary: {
        zh: '武圣人，义薄云天的典范。红脸长髯，手持青龙偃月刀，坐骑赤兔马。',
        en: 'The God of War, the epitome of loyalty and righteousness. Red-faced with a long beard, wielding the Green Dragon Crescent Blade, riding Red Hare.'
      },
      personalityTraits: ['义绝', '傲上而不凌下', '读春秋'],
      famousScenes: ['温酒斩华雄', '过五关斩六将', '单刀赴会', '刮骨疗毒', '败走麦城'],
      sources: ['source-sanguo-yanyi'],
    },
    images: [],
    quotes: [
      { zh: '吾观颜良，如插标卖首耳。', en: 'I see Yan Liang as one selling his head on a pike.', source: '三国演义' },
    ],
    verified: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'zhang-fei',
    canonicalName: { zh: '张飞', en: 'Zhang Fei' },
    courtesyName: { zh: '翼德', en: 'Yide' },
    aliases: [{ zh: '猛张飞', en: 'Fierce Zhang Fei' }],
    birthYear: 167,
    deathYear: 221,
    kingdom: 'SHU',
    socialClass: 'Merchant',
    occupations: ['General', 'Butcher (former)'],
    historicalProfile: {
      summary: {
        zh: '蜀汉名将，与关羽并称万人敌。性格暴躁，鞭挞士卒，最终被部下所杀。',
        en: 'Famous general of Shu Han, known alongside Guan Yu as worth ten thousand men. Violent temper, beaten by subordinates, eventually killed by his own men.'
      },
      personalityTraits: ['勇猛', '暴躁', '粗中有细'],
      achievements: ['长坂坡断桥退敌', '义释严颜', '智取瓦口隘'],
      sources: ['source-sanguo-zhi'],
    },
    literaryProfile: {
      summary: {
        zh: '豹头环眼，声若巨雷。虽然粗猛，却是粗中有细，书画俱佳。',
        en: 'Leopard head and round eyes, voice like thunder. Though fierce, he was cunning and skilled in calligraphy and painting.'
      },
      personalityTraits: ['粗豪', '嗜酒', '重义'],
      famousScenes: ['怒鞭督邮', '长坂坡退曹', '义释严颜', '智取瓦口隘'],
      sources: ['source-sanguo-yanyi'],
    },
    images: [],
    quotes: [
      { zh: '燕人张翼德在此！谁敢与我决一死战！', en: 'Zhang Yide of Yan is here! Who dares fight me to the death!', source: '三国演义' },
    ],
    verified: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'zhuge-liang',
    canonicalName: { zh: '诸葛亮', en: 'Zhuge Liang' },
    courtesyName: { zh: '孔明', en: 'Kongming' },
    aliases: [{ zh: '卧龙', en: 'Sleeping Dragon' }, { zh: '武侯', en: 'Marquis Wu' }],
    birthYear: 181,
    deathYear: 234,
    kingdom: 'SHU',
    socialClass: 'Gentry',
    occupations: ['Chancellor', 'Strategist', 'Inventor'],
    historicalProfile: {
      summary: {
        zh: '蜀汉丞相，杰出的政治家、军事家、发明家。鞠躬尽瘁，死而后已。',
        en: 'Chancellor of Shu Han, outstanding politician, military strategist, and inventor. Devoted his life to service until death.'
      },
      personalityTraits: ['智慧', '谨慎', '忠诚'],
      achievements: ['隆中对策定三分', '七擒孟获', '六出祁山', '发明木牛流马'],
      sources: ['source-sanguo-zhi'],
    },
    literaryProfile: {
      summary: {
        zh: '智绝天下，羽扇纶巾。能呼风唤雨，料事如神，是三国演义中智慧的化身。',
        en: 'Supreme intellect, with feather fan and silk headband. Could summon wind and rain, predict events like a god, the embodiment of wisdom in Romance.'
      },
      personalityTraits: ['神机妙算', '鞠躬尽瘁', '淡泊明志'],
      famousScenes: ['三顾茅庐', '草船借箭', '空城计', '借东风', '秋风五丈原'],
      sources: ['source-sanguo-yanyi'],
    },
    images: [],
    quotes: [
      { zh: '非淡泊无以明志，非宁静无以致远。', en: 'Without serenity, there can be no lofty ambition; without tranquility, there can be no far-reaching goal.', source: '诫子书' },
    ],
    verified: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'cao-cao',
    canonicalName: { zh: '曹操', en: 'Cao Cao' },
    courtesyName: { zh: '孟德', en: 'Mengde' },
    aliases: [{ zh: '奸雄', en: 'Cunning Hero' }, { zh: '魏武帝', en: 'Emperor Wu of Wei' }],
    birthYear: 155,
    deathYear: 220,
    kingdom: 'WEI',
    socialClass: 'Eunuch family (adopted)',
    occupations: ['Chancellor', 'Warlord', 'Poet'],
    historicalProfile: {
      summary: {
        zh: '曹魏奠基人，杰出的政治家、军事家、诗人。统一北方，挟天子以令诸侯。',
        en: 'Founder of Cao Wei, outstanding politician, military strategist, and poet. Unified northern China, controlled the emperor to command the lords.'
      },
      personalityTraits: ['雄才大略', '多疑', '知人善任'],
      achievements: ['统一北方', '屯田制', '建安文学领袖'],
      sources: ['source-sanguo-zhi'],
    },
    literaryProfile: {
      summary: {
        zh: '治世之能臣，乱世之奸雄。阴险多疑却又爱才如命，是复杂的反派人物。',
        en: 'A capable minister in peaceful times, a cunning hero in chaotic times. Suspicious yet loves talent, a complex antagonist.'
      },
      personalityTraits: ['奸诈', '多疑', '爱才'],
      famousScenes: ['煮酒论英雄', '割须弃袍', '赤壁大败', '杀吕伯奢'],
      sources: ['source-sanguo-yanyi'],
    },
    images: [],
    quotes: [
      { zh: '宁教我负天下人，休教天下人负我。', en: 'I would rather betray the world than let the world betray me.', source: '三国演义' },
    ],
    verified: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'sun-quan',
    canonicalName: { zh: '孙权', en: 'Sun Quan' },
    courtesyName: { zh: '仲谋', en: 'Zhongmou' },
    aliases: [{ zh: '碧眼儿', en: 'Blue-eyed Boy' }, { zh: '吴大帝', en: 'Emperor Da of Wu' }],
    birthYear: 182,
    deathYear: 252,
    kingdom: 'WU',
    socialClass: 'Military aristocracy',
    occupations: ['Emperor', 'Warlord'],
    historicalProfile: {
      summary: {
        zh: '东吴开国皇帝，继承父兄基业，坐领江东。善于用人，稳固东吴基业。',
        en: 'Founding emperor of Eastern Wu, inherited his father and brother\'s legacy, ruled Jiangdong. Good at employing talent, stabilized Wu\'s foundation.'
      },
      personalityTraits: ['隐忍', '善于用人', '多疑晚年'],
      achievements: ['建立东吴', '赤壁之战盟军', '夷陵之战大胜'],
      sources: ['source-sanguo-zhi'],
    },
    literaryProfile: {
      summary: {
        zh: '碧眼紫髯，相貌奇特。年少继位，在赤壁之战中与刘备联合击败曹操。',
        en: 'Blue eyes and purple beard, unusual appearance. Succeeded at young age, allied with Liu Bei to defeat Cao Cao at Red Cliffs.'
      },
      personalityTraits: ['沉稳', '能屈能伸', '善于权衡'],
      famousScenes: ['赤壁联盟', '夷陵大捷', '称帝建吴'],
      sources: ['source-sanguo-yanyi'],
    },
    images: [],
    quotes: [
      { zh: '内事不决问张昭，外事不决问周瑜。', en: 'For internal affairs, ask Zhang Zhao; for external affairs, ask Zhou Yu.', source: '三国演义' },
    ],
    verified: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'zhao-yun',
    canonicalName: { zh: '赵云', en: 'Zhao Yun' },
    courtesyName: { zh: '子龙', en: 'Zilong' },
    aliases: [{ zh: '常山赵子龙', en: 'Zhao Zilong of Changshan' }],
    birthYear: 168,
    deathYear: 229,
    kingdom: 'SHU',
    socialClass: 'Commoner',
    occupations: ['General', 'Bodyguard'],
    historicalProfile: {
      summary: {
        zh: '蜀汉名将，以忠勇著称。长坂坡救阿斗，护卫刘备多年。',
        en: 'Famous general of Shu Han, known for loyalty and bravery. Saved Adou at Changban, guarded Liu Bei for many years.'
      },
      personalityTraits: ['忠诚', '勇武', '谨慎'],
      achievements: ['长坂坡救阿斗', '截江夺阿斗', '汉水之战'],
      sources: ['source-sanguo-zhi'],
    },
    literaryProfile: {
      summary: {
        zh: '一身是胆，浑身是胆的白袍小将。长坂坡七进七出，单骑救主。',
        en: 'The white-robed young general with courage through and through. Charged in and out seven times at Changban, saving his lord alone.'
      },
      personalityTraits: ['忠勇', '冷静', '武艺超群'],
      famousScenes: ['长坂坡七进七出', '截江夺阿斗', '空营计退敌'],
      sources: ['source-sanguo-yanyi'],
    },
    images: [],
    quotes: [
      { zh: '吾乃常山赵子龙！', en: 'I am Zhao Zilong of Changshan!', source: '三国演义' },
    ],
    verified: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'zhou-yu',
    canonicalName: { zh: '周瑜', en: 'Zhou Yu' },
    courtesyName: { zh: '公瑾', en: 'Gongjin' },
    aliases: [{ zh: '美周郎', en: 'Handsome Zhou' }],
    birthYear: 175,
    deathYear: 210,
    kingdom: 'WU',
    socialClass: 'Gentry',
    occupations: ['General', 'Strategist', 'Musician'],
    historicalProfile: {
      summary: {
        zh: '东吴名将，赤壁之战主帅。与孙策为连襟，精通音律。',
        en: 'Famous general of Eastern Wu, commander at Battle of Red Cliffs. Brother-in-law to Sun Ce, skilled in music.'
      },
      personalityTraits: ['才略过人', '气度恢宏', '深谋远虑'],
      achievements: ['赤壁之战', '南郡之战', '规划取蜀'],
      sources: ['source-sanguo-zhi'],
    },
    literaryProfile: {
      summary: {
        zh: '英俊潇洒，精通音律。与诸葛亮斗智，因气量狭小而被气死。',
        en: 'Handsome and elegant, skilled in music. Competed with Zhuge Liang in wits, died from anger due to narrow-mindedness.'
      },
      personalityTraits: ['才高', '气量狭小', '骄傲'],
      famousScenes: ['赤壁之战', '群英会', '三气周瑜', '既生瑜何生亮'],
      sources: ['source-sanguo-yanyi'],
    },
    images: [],
    quotes: [
      { zh: '既生瑜，何生亮！', en: 'Since Yu was born, why was Liang also born!', source: '三国演义' },
    ],
    verified: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'lu-bu',
    canonicalName: { zh: '吕布', en: 'Lü Bu' },
    courtesyName: { zh: '奉先', en: 'Fengxian' },
    aliases: [{ zh: '飞将', en: 'Flying General' }],
    birthYear: 161,
    deathYear: 199,
    kingdom: 'OTHER',
    socialClass: 'Commoner',
    occupations: ['General', 'Warlord'],
    historicalProfile: {
      summary: {
        zh: '汉末名将，以武勇著称，被称为"飞将"。先后背叛丁原、董卓，最终被曹操所杀。',
        en: 'Famous general of late Han, known for martial prowess, called "Flying General". Betrayed Ding Yuan and Dong Zhuo, eventually killed by Cao Cao.'
      },
      personalityTraits: ['勇猛', '反复无常', '有勇无谋'],
      achievements: ['杀丁原', '杀董卓', '辕门射戟'],
      sources: ['source-sanguo-zhi'],
    },
    literaryProfile: {
      summary: {
        zh: '人中吕布，马中赤兔。天下第一武将，却是三姓家奴，反复无常。',
        en: 'Among men Lü Bu, among horses Red Hare. Greatest warrior under heaven, yet a slave of three masters, constantly betraying.'
      },
      personalityTraits: ['武勇无双', '见利忘义', '好色'],
      famousScenes: ['三英战吕布', '辕门射戟', '白门楼殒命', '貂蝉连环计'],
      sources: ['source-sanguo-yanyi'],
    },
    images: [],
    quotes: [
      { zh: '大耳儿！不记辕门射戟时耶？', en: 'Big-eared one! Do you not remember when I shot the halberd at the gate?', source: '三国演义' },
    ],
    verified: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'diao-chan',
    canonicalName: { zh: '貂蝉', en: 'Diao Chan' },
    aliases: [{ zh: '任红昌', en: 'Ren Hongchang' }],
    kingdom: 'OTHER',
    socialClass: 'Servant',
    occupations: ['Singer', 'Dancer'],
    historicalProfile: {
      summary: {
        zh: '历史上可能并不存在的人物，仅见于小说。',
        en: 'A character who may not have existed historically, appearing only in fiction.'
      },
      personalityTraits: [],
      achievements: [],
      sources: [],
    },
    literaryProfile: {
      summary: {
        zh: '中国古代四大美女之一。司徒王允的义女，用连环计离间董卓与吕布。',
        en: 'One of the Four Beauties of ancient China. Adopted daughter of Wang Yun, used a chain stratagem to divide Dong Zhuo and Lü Bu.'
      },
      personalityTraits: ['美丽', '智慧', '忠义'],
      famousScenes: ['连环计', '凤仪亭', '拜月'],
      sources: ['source-sanguo-yanyi'],
    },
    images: [],
    quotes: [],
    verified: false,
    createdAt: now,
    updatedAt: now,
  },
];

// Add birth locations to characters
characters.forEach(char => {
  if (char.birthLocationId) {
    char.birthLocation = locations.find(loc => loc.id === char.birthLocationId);
  }
});

// Relationships
export const relationships: CharacterRelationship[] = [
  {
    id: 'rel-liu-guan-sworn',
    characterAId: 'liu-bei',
    characterBId: 'guan-yu',
    relationshipType: 'SWORN_BROTHER',
    relationshipSource: 'BOTH',
    sources: ['source-sanguo-yanyi'],
    startYear: 184,
    description: { zh: '桃园三结义，刘备为大哥，关羽为二弟', en: 'Peach Garden Oath - Liu Bei as eldest, Guan Yu as second' },
    strength: 10,
    isReciprocal: true,
    createdAt: now,
  },
  {
    id: 'rel-liu-zhang-sworn',
    characterAId: 'liu-bei',
    characterBId: 'zhang-fei',
    relationshipType: 'SWORN_BROTHER',
    relationshipSource: 'BOTH',
    sources: ['source-sanguo-yanyi'],
    startYear: 184,
    description: { zh: '桃园三结义，刘备为大哥，张飞为三弟', en: 'Peach Garden Oath - Liu Bei as eldest, Zhang Fei as third' },
    strength: 10,
    isReciprocal: true,
    createdAt: now,
  },
  {
    id: 'rel-guan-zhang-sworn',
    characterAId: 'guan-yu',
    characterBId: 'zhang-fei',
    relationshipType: 'SWORN_BROTHER',
    relationshipSource: 'BOTH',
    sources: ['source-sanguo-yanyi'],
    startYear: 184,
    description: { zh: '桃园三结义，关羽为二弟，张飞为三弟', en: 'Peach Garden Oath - Guan Yu as second, Zhang Fei as third' },
    strength: 10,
    isReciprocal: true,
    createdAt: now,
  },
  {
    id: 'rel-liu-zhuge',
    characterAId: 'liu-bei',
    characterBId: 'zhuge-liang',
    relationshipType: 'LORD_VASSAL',
    relationshipSource: 'BOTH',
    sources: ['source-sanguo-zhi', 'source-sanguo-yanyi'],
    startYear: 207,
    description: { zh: '三顾茅庐后，诸葛亮出山辅佐刘备', en: 'After three visits to the thatched cottage, Zhuge Liang joined Liu Bei' },
    strength: 10,
    isReciprocal: false,
    createdAt: now,
  },
  {
    id: 'rel-liu-zhao',
    characterAId: 'liu-bei',
    characterBId: 'zhao-yun',
    relationshipType: 'LORD_VASSAL',
    relationshipSource: 'BOTH',
    sources: ['source-sanguo-zhi', 'source-sanguo-yanyi'],
    startYear: 200,
    description: { zh: '赵云追随刘备，忠心护主', en: 'Zhao Yun followed Liu Bei, loyally protecting his lord' },
    strength: 9,
    isReciprocal: false,
    createdAt: now,
  },
  {
    id: 'rel-liu-cao-rival',
    characterAId: 'liu-bei',
    characterBId: 'cao-cao',
    relationshipType: 'RIVAL',
    relationshipSource: 'BOTH',
    sources: ['source-sanguo-zhi', 'source-sanguo-yanyi'],
    startYear: 194,
    description: { zh: '汉末争霸的主要对手', en: 'Main rivals in the struggle for Han succession' },
    strength: 8,
    isReciprocal: true,
    createdAt: now,
  },
  {
    id: 'rel-cao-liu-enemy',
    characterAId: 'cao-cao',
    characterBId: 'liu-bei',
    relationshipType: 'ENEMY',
    relationshipSource: 'LITERARY',
    sources: ['source-sanguo-yanyi'],
    description: { zh: '三国演义中的主要对立面', en: 'Main opposing forces in Romance of Three Kingdoms' },
    strength: 7,
    isReciprocal: true,
    createdAt: now,
  },
  {
    id: 'rel-zhuge-zhou-rival',
    characterAId: 'zhuge-liang',
    characterBId: 'zhou-yu',
    relationshipType: 'RIVAL',
    relationshipSource: 'LITERARY',
    sources: ['source-sanguo-yanyi'],
    startYear: 208,
    endYear: 210,
    description: { zh: '赤壁之战期间的智力较量', en: 'Intellectual rivalry during the Battle of Red Cliffs' },
    strength: 8,
    isReciprocal: true,
    createdAt: now,
  },
  {
    id: 'rel-sun-zhou',
    characterAId: 'sun-quan',
    characterBId: 'zhou-yu',
    relationshipType: 'LORD_VASSAL',
    relationshipSource: 'BOTH',
    sources: ['source-sanguo-zhi', 'source-sanguo-yanyi'],
    description: { zh: '周瑜为东吴大都督，孙权倚重', en: 'Zhou Yu as Grand Commander of Wu, trusted by Sun Quan' },
    strength: 9,
    isReciprocal: false,
    createdAt: now,
  },
  {
    id: 'rel-lubu-diaochan',
    characterAId: 'lu-bu',
    characterBId: 'diao-chan',
    relationshipType: 'SPOUSE',
    relationshipSource: 'LITERARY',
    sources: ['source-sanguo-yanyi'],
    description: { zh: '吕布为貂蝉杀董卓', en: 'Lü Bu killed Dong Zhuo for Diao Chan' },
    strength: 8,
    isReciprocal: true,
    createdAt: now,
  },
  {
    id: 'rel-guan-cao-friend',
    characterAId: 'guan-yu',
    characterBId: 'cao-cao',
    relationshipType: 'FRIEND',
    relationshipSource: 'LITERARY',
    sources: ['source-sanguo-yanyi'],
    description: { zh: '曹操敬重关羽，关羽义释曹操', en: 'Cao Cao respected Guan Yu, who released Cao Cao out of loyalty' },
    strength: 6,
    isReciprocal: true,
    createdAt: now,
  },
];

// Add character references to relationships
relationships.forEach(rel => {
  rel.characterA = characters.find(c => c.id === rel.characterAId);
  rel.characterB = characters.find(c => c.id === rel.characterBId);
});

// Events
export const events: Event[] = [
  {
    id: 'event-yellow-turban',
    name: { zh: '黄巾起义', en: 'Yellow Turban Rebellion' },
    type: 'POLITICAL',
    dateYear: 184,
    dateMonth: 2,
    datePrecision: 'APPROXIMATE',
    durationDays: 365,
    description: {
      zh: '张角领导的农民起义，标志着东汉末年乱世的开始',
      en: 'Peasant uprising led by Zhang Jiao, marking the beginning of the late Han chaos'
    },
    significance: {
      zh: '东汉灭亡的导火索，三国时代的序幕',
      en: 'The trigger for the fall of Eastern Han, prelude to the Three Kingdoms era'
    },
    historicalAccount: {
      summary: '太平道首领张角以宗教组织发动起义',
      sources: ['source-sanguo-zhi']
    },
    literaryAccount: {
      summary: '苍天已死，黄天当立，岁在甲子，天下大吉',
      sources: ['source-sanguo-yanyi']
    },
    participants: [
      { characterId: 'liu-bei', role: '讨贼义军' },
      { characterId: 'guan-yu', role: '义军' },
      { characterId: 'zhang-fei', role: '义军' },
    ],
    outcomes: [{ zh: '起义被镇压，但东汉朝廷威信尽失', en: 'Rebellion suppressed but Han court lost all authority' }],
    leadsToEventIds: ['event-dong-zhuo'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'event-dong-zhuo',
    name: { zh: '董卓乱政', en: 'Dong Zhuo\'s Tyranny' },
    type: 'POLITICAL',
    dateYear: 189,
    datePrecision: 'EXACT',
    description: {
      zh: '董卓进京控制朝政，废立皇帝，引发诸侯讨伐',
      en: 'Dong Zhuo entered the capital, controlled the court, deposed and installed emperors, provoking lords to rise against him'
    },
    participants: [
      { characterId: 'cao-cao', role: '讨董联军' },
      { characterId: 'liu-bei', role: '讨董联军' },
      { characterId: 'lu-bu', role: '董卓部将' },
    ],
    outcomes: [{ zh: '董卓迁都长安，最终被吕布所杀', en: 'Dong Zhuo moved capital to Chang\'an, eventually killed by Lü Bu' }],
    leadsToEventIds: ['event-red-cliffs'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'event-red-cliffs',
    name: { zh: '赤壁之战', en: 'Battle of Red Cliffs' },
    type: 'BATTLE',
    dateYear: 208,
    dateMonth: 11,
    datePrecision: 'APPROXIMATE',
    durationDays: 30,
    locationId: 'loc-chibi',
    description: {
      zh: '孙刘联军以火攻大败曹操，奠定三国鼎立格局',
      en: 'Sun-Liu alliance defeated Cao Cao with fire attack, establishing the three kingdoms balance'
    },
    significance: {
      zh: '三国历史上最重要的战役，确立了三分天下的格局',
      en: 'The most important battle in Three Kingdoms history, establishing the tripartite division'
    },
    historicalAccount: {
      summary: '曹操南征，孙刘联军于赤壁大败曹军',
      sources: ['source-sanguo-zhi']
    },
    literaryAccount: {
      summary: '诸葛亮借东风，周瑜火烧连环船',
      sources: ['source-sanguo-yanyi']
    },
    participants: [
      { characterId: 'cao-cao', role: '曹军统帅' },
      { characterId: 'zhou-yu', role: '联军统帅' },
      { characterId: 'zhuge-liang', role: '刘军军师' },
      { characterId: 'liu-bei', role: '联军一方' },
      { characterId: 'sun-quan', role: '联军一方' },
    ],
    outcomes: [
      { zh: '曹操大败北归', en: 'Cao Cao suffered major defeat and retreated north' },
      { zh: '三国鼎立格局形成', en: 'Tripartite division established' }
    ],
    leadsToEventIds: ['event-yiling'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'event-yiling',
    name: { zh: '夷陵之战', en: 'Battle of Yiling' },
    type: 'BATTLE',
    dateYear: 222,
    datePrecision: 'EXACT',
    description: {
      zh: '刘备为报关羽之仇伐吴，被陆逊火烧连营大败',
      en: 'Liu Bei attacked Wu to avenge Guan Yu, defeated by Lu Xun\'s fire attack on linked camps'
    },
    participants: [
      { characterId: 'liu-bei', role: '蜀军统帅' },
      { characterId: 'sun-quan', role: '吴国君主' },
    ],
    outcomes: [
      { zh: '蜀汉元气大伤', en: 'Shu Han severely weakened' },
      { zh: '刘备病逝白帝城', en: 'Liu Bei died at Baidicheng' }
    ],
    leadsToEventIds: [],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'event-peach-garden',
    name: { zh: '桃园三结义', en: 'Oath of the Peach Garden' },
    type: 'PERSONAL',
    dateYear: 184,
    datePrecision: 'LITERARY',
    description: {
      zh: '刘备、关羽、张飞于桃园中结为兄弟，誓同生死',
      en: 'Liu Bei, Guan Yu, and Zhang Fei swore brotherhood in a peach garden, vowing to live and die together'
    },
    significance: {
      zh: '义结金兰的典范，影响后世无数',
      en: 'The exemplar of sworn brotherhood, influencing countless generations'
    },
    literaryAccount: {
      summary: '不求同年同月同日生，但求同年同月同日死',
      sources: ['source-sanguo-yanyi']
    },
    participants: [
      { characterId: 'liu-bei', role: '大哥' },
      { characterId: 'guan-yu', role: '二弟' },
      { characterId: 'zhang-fei', role: '三弟' },
    ],
    outcomes: [{ zh: '三人结为兄弟，共同起兵', en: 'The three became brothers and raised an army together' }],
    leadsToEventIds: ['event-yellow-turban'],
    createdAt: now,
    updatedAt: now,
  },
];

// Add location references to events
events.forEach(event => {
  if (event.locationId) {
    event.location = locations.find(loc => loc.id === event.locationId);
  }
});

// Timeline Entries
export const timelineEntries: TimelineEntry[] = [
  {
    id: 'timeline-liu-birth',
    year: 161,
    characterId: 'liu-bei',
    description: { zh: '刘备出生于涿郡', en: 'Liu Bei born in Zhuo Commandery' },
    importance: 8,
    category: 'birth',
    createdAt: now,
  },
  {
    id: 'timeline-cao-birth',
    year: 155,
    characterId: 'cao-cao',
    description: { zh: '曹操出生于沛国谯县', en: 'Cao Cao born in Qiao County' },
    importance: 8,
    category: 'birth',
    createdAt: now,
  },
  {
    id: 'timeline-peach-garden',
    year: 184,
    eventId: 'event-peach-garden',
    description: { zh: '桃园三结义', en: 'Oath of the Peach Garden' },
    importance: 9,
    category: 'personal',
    createdAt: now,
  },
  {
    id: 'timeline-yellow-turban',
    year: 184,
    eventId: 'event-yellow-turban',
    description: { zh: '黄巾起义爆发', en: 'Yellow Turban Rebellion begins' },
    importance: 10,
    category: 'political',
    createdAt: now,
  },
  {
    id: 'timeline-dong-zhuo',
    year: 189,
    eventId: 'event-dong-zhuo',
    description: { zh: '董卓乱政', en: 'Dong Zhuo\'s Tyranny begins' },
    importance: 9,
    category: 'political',
    createdAt: now,
  },
  {
    id: 'timeline-red-cliffs',
    year: 208,
    eventId: 'event-red-cliffs',
    description: { zh: '赤壁之战', en: 'Battle of Red Cliffs' },
    importance: 10,
    category: 'battle',
    createdAt: now,
  },
  {
    id: 'timeline-zhou-death',
    year: 210,
    characterId: 'zhou-yu',
    description: { zh: '周瑜病逝', en: 'Zhou Yu dies' },
    importance: 8,
    category: 'death',
    createdAt: now,
  },
  {
    id: 'timeline-cao-death',
    year: 220,
    characterId: 'cao-cao',
    description: { zh: '曹操病逝', en: 'Cao Cao dies' },
    importance: 9,
    category: 'death',
    createdAt: now,
  },
  {
    id: 'timeline-guan-death',
    year: 220,
    characterId: 'guan-yu',
    description: { zh: '关羽被杀', en: 'Guan Yu killed' },
    importance: 9,
    category: 'death',
    createdAt: now,
  },
  {
    id: 'timeline-zhang-death',
    year: 221,
    characterId: 'zhang-fei',
    description: { zh: '张飞被杀', en: 'Zhang Fei killed' },
    importance: 8,
    category: 'death',
    createdAt: now,
  },
  {
    id: 'timeline-yiling',
    year: 222,
    eventId: 'event-yiling',
    description: { zh: '夷陵之战', en: 'Battle of Yiling' },
    importance: 9,
    category: 'battle',
    createdAt: now,
  },
  {
    id: 'timeline-liu-death',
    year: 223,
    characterId: 'liu-bei',
    description: { zh: '刘备病逝于白帝城', en: 'Liu Bei dies at Baidicheng' },
    importance: 10,
    category: 'death',
    createdAt: now,
  },
  {
    id: 'timeline-zhuge-death',
    year: 234,
    characterId: 'zhuge-liang',
    description: { zh: '诸葛亮病逝于五丈原', en: 'Zhuge Liang dies at Wuzhang Plains' },
    importance: 10,
    category: 'death',
    createdAt: now,
  },
];

// Add references to timeline entries
timelineEntries.forEach(entry => {
  if (entry.eventId) {
    entry.event = events.find(e => e.id === entry.eventId);
  }
  if (entry.characterId) {
    entry.character = characters.find(c => c.id === entry.characterId);
  }
});

// Chapters - load actual content from source files

export const chapters: Chapter[] = [];

/**
 * Load chapter content from source file
 * Source files are located at: ../../../../../../src/
 * Format: {number}.{title}.txt
 */
function loadChapterContent(chapterNumber: number): { title: string; content: string } | null {
  try {
    // Path from apps/api/src/data/ to project root src/
    const srcDir = path.resolve(__dirname, '../../../../src');

    // Find the file that starts with the chapter number
    const files = fs.readdirSync(srcDir);
    const chapterFile = files.find(f => {
      const match = f.match(/^(\d+)\./);
      return match && parseInt(match[1]) === chapterNumber;
    });

    if (!chapterFile) {
      return null;
    }

    const filePath = path.join(srcDir, chapterFile);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract title from first line (e.g., "第一回 宴桃园豪杰三结义 斩黄巾英雄首立功")
    const lines = content.split('\n');
    const firstLine = lines[0] || '';
    const titleMatch = firstLine.match(/第.+回\s+(.+)/);
    const title = titleMatch ? titleMatch[1].trim() : firstLine;

    // Rest of content (skip first line which is the title)
    const bodyContent = lines.slice(1).join('\n').trim();

    return { title, content: bodyContent };
  } catch (error) {
    console.warn(`Could not load chapter ${chapterNumber}:`, error);
    return null;
  }
}

// English translations for chapters (can be expanded)
const chapterTitlesEn: { [key: number]: string } = {
  1: 'Three Heroes Swear Brotherhood in the Peach Garden; Heroes First Achieve Merit by Slaying Yellow Turbans',
  2: 'Zhang Fei Whips the Inspector in Anger; He Jin Plots Against the Eunuchs',
  3: 'At Wenming Palace, Dong Zhuo Berates Ding Yuan; Li Su Bribes Lü Bu with Gold',
  4: 'The Han Emperor is Deposed; Cao Cao Offers a Knife to Slay Dong Zhuo',
  5: 'The Lords Respond to Cao Cao\'s Call; Three Heroes Battle Lü Bu',
  6: 'Dong Zhuo Burns the Golden Palace; Sun Jian Hides the Imperial Seal',
  7: 'Yuan Shao Battles Gongsun Zan at Panhe; Sun Jian Crosses the River to Attack Liu Biao',
  8: 'Wang Yun\'s Chain Stratagem; Dong Zhuo Rages at Fengyi Pavilion',
};

// Generate all 120 chapters - load content from source files
for (let i = 1; i <= 120; i++) {
  const loaded = loadChapterContent(i);

  if (loaded) {
    chapters.push({
      id: `chapter-${i}`,
      chapterNumber: i,
      title: {
        zh: loaded.title,
        en: chapterTitlesEn[i] || `Chapter ${i}`
      },
      content: {
        zh: loaded.content,
      },
      summary: {
        zh: loaded.content.substring(0, 200) + '...',
        en: `Summary of Chapter ${i}`
      },
      metadata: {
        keyCharacters: i <= 5 ? ['liu-bei', 'guan-yu', 'zhang-fei'] : [],
        keyEvents: i === 1 ? ['event-peach-garden', 'event-yellow-turban'] : [],
        themes: ['heroism', 'loyalty'],
        characterCount: loaded.content.length,
      },
      createdAt: now,
      updatedAt: now,
    });
  } else {
    // Fallback to placeholder if file not found
    chapters.push({
      id: `chapter-${i}`,
      chapterNumber: i,
      title: { zh: `第${i}回`, en: `Chapter ${i}` },
      content: {
        zh: `第${i}回\n\n（内容加载失败，请检查源文件）`,
        en: `Chapter ${i}\n\n(Content failed to load, please check source files)`
      },
      summary: { zh: `第${i}回概要`, en: `Summary of Chapter ${i}` },
      metadata: {},
      createdAt: now,
      updatedAt: now,
    });
  }
}

// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

export const mockDb = {
  // Sources
  source: {
    findUnique: (args: { where: { id: string } }) =>
      sources.find(s => s.id === args.where.id) || null,
    findMany: (args?: { where?: { type?: SourceType } }) => {
      if (args?.where?.type) {
        return sources.filter(s => s.type === args.where!.type);
      }
      return [...sources];
    },
  },

  // Locations
  location: {
    findUnique: (args: { where: { id: string } }) =>
      locations.find(l => l.id === args.where.id) || null,
    findMany: () => [...locations],
  },

  // Characters
  character: {
    findUnique: (args: { where: { id: string } }) => {
      const char = characters.find(c => c.id === args.where.id);
      return char || null;
    },
    findMany: (args?: any) => {
      let result = [...characters];

      if (args?.where) {
        if (args.where.kingdom) {
          result = result.filter(c => c.kingdom === args.where.kingdom);
        }
        if (args.where.verified !== undefined) {
          result = result.filter(c => c.verified === args.where.verified);
        }
        if (args.where.OR) {
          const searchTerms = args.where.OR;
          result = result.filter(c => {
            return searchTerms.some((term: any) => {
              if (term.canonicalName?.path) {
                const path = term.canonicalName.path[0];
                const searchStr = term.canonicalName.string_contains?.toLowerCase() || '';
                const value = (c.canonicalName as any)[path]?.toLowerCase() || '';
                return value.includes(searchStr);
              }
              return false;
            });
          });
        }
      }

      if (args?.orderBy) {
        const key = Object.keys(args.orderBy)[0];
        const dir = args.orderBy[key];
        result.sort((a: any, b: any) => {
          if (a[key] === undefined || a[key] === null) return 1;
          if (b[key] === undefined || b[key] === null) return -1;
          return dir === 'asc' ? a[key] - b[key] : b[key] - a[key];
        });
      }

      if (args?.skip) result = result.slice(args.skip);
      if (args?.take) result = result.slice(0, args.take);

      return result;
    },
    count: (args?: any) => {
      let result = [...characters];
      if (args?.where?.kingdom) {
        result = result.filter(c => c.kingdom === args.where.kingdom);
      }
      return result.length;
    },
  },

  // Relationships
  characterRelationship: {
    findMany: (args?: any) => {
      let result = [...relationships];

      if (args?.where) {
        if (args.where.relationshipType) {
          result = result.filter(r => r.relationshipType === args.where.relationshipType);
        }
        if (args.where.relationshipSource) {
          result = result.filter(r => r.relationshipSource === args.where.relationshipSource);
        }
        if (args.where.strength?.gte) {
          result = result.filter(r => r.strength >= args.where.strength.gte);
        }
        if (args.where.OR) {
          result = result.filter(r => {
            return args.where.OR.some((cond: any) => {
              if (cond.characterAId) return r.characterAId === cond.characterAId;
              if (cond.characterBId) return r.characterBId === cond.characterBId;
              return false;
            });
          });
        }
      }

      if (args?.orderBy?.strength) {
        result.sort((a, b) => args.orderBy.strength === 'desc' ? b.strength - a.strength : a.strength - b.strength);
      }

      return result;
    },
  },

  // Events
  event: {
    findUnique: (args: { where: { id: string } }) =>
      events.find(e => e.id === args.where.id) || null,
    findMany: (args?: any) => {
      let result = [...events];

      if (args?.where) {
        if (args.where.type) {
          result = result.filter(e => e.type === args.where.type);
        }
        if (args.where.dateYear) {
          if (args.where.dateYear.gte) {
            result = result.filter(e => e.dateYear >= args.where.dateYear.gte);
          }
          if (args.where.dateYear.lte) {
            result = result.filter(e => e.dateYear <= args.where.dateYear.lte);
          }
        }
      }

      result.sort((a, b) => a.dateYear - b.dateYear);

      if (args?.skip) result = result.slice(args.skip);
      if (args?.take) result = result.slice(0, args.take);

      return result;
    },
  },

  // Chapters
  chapter: {
    findUnique: (args: { where: { number?: number; id?: string } }) => {
      if (args.where.number) {
        return chapters.find(c => c.chapterNumber === args.where.number) || null;
      }
      return chapters.find(c => c.id === args.where.id) || null;
    },
    findMany: (args?: any) => {
      let result = [...chapters];
      if (args?.orderBy?.number) {
        result.sort((a, b) => args.orderBy.number === 'asc' ? a.chapterNumber - b.chapterNumber : b.chapterNumber - a.chapterNumber);
      }
      return result;
    },
    count: () => chapters.length,
  },

  // Timeline
  timelineEntry: {
    findMany: (args?: any) => {
      let result = [...timelineEntries];

      if (args?.where) {
        if (args.where.year) {
          if (args.where.year.gte) {
            result = result.filter(t => t.year >= args.where.year.gte);
          }
          if (args.where.year.lte) {
            result = result.filter(t => t.year <= args.where.year.lte);
          }
        }
        if (args.where.importance?.gte) {
          result = result.filter(t => t.importance >= args.where.importance.gte);
        }
        if (args.where.category) {
          result = result.filter(t => t.category === args.where.category);
        }
      }

      result.sort((a, b) => a.year - b.year);

      return result;
    },
  },
};

export default mockDb;
