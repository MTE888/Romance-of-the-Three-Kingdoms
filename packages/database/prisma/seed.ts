/**
 * Three Kingdoms Database Seed Script
 *
 * Seeds the database with initial data:
 * 1. Primary sources (三国志, 三国演义)
 * 2. Initial character data (top 50 characters)
 * 3. Major events
 * 4. Key locations
 *
 * Run with: pnpm db:seed
 */

import { PrismaClient } from '../src/generated';
import type {
  SourceType,
  ReliabilityTier,
  Kingdom,
} from '../src/generated';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clean existing data (only in development!)
  if (process.env.NODE_ENV !== 'production') {
    console.log('🗑️  Cleaning existing data...');
    await prisma.fact.deleteMany();
    await prisma.timelineEntry.deleteMany();
    await prisma.characterRelationship.deleteMany();
    await prisma.chapter.deleteMany();
    await prisma.event.deleteMany();
    await prisma.character.deleteMany();
    await prisma.location.deleteMany();
    await prisma.source.deleteMany();
    console.log('✅ Cleaned\n');
  }

  // 1. Seed Sources
  console.log('📚 Seeding sources...');
  const sources = await seedSources();
  console.log(`✅ Created ${sources.length} sources\n`);

  // 2. Seed Locations
  console.log('📍 Seeding locations...');
  const locations = await seedLocations();
  console.log(`✅ Created ${locations.length} locations\n`);

  // 3. Seed Characters
  console.log('👥 Seeding characters...');
  const characters = await seedCharacters(locations, sources);
  console.log(`✅ Created ${characters.length} characters\n`);

  // 4. Seed Relationships
  console.log('🔗 Seeding character relationships...');
  const relationships = await seedRelationships(characters);
  console.log(`✅ Created ${relationships.length} relationships\n`);

  // 5. Seed Events
  console.log('⚔️  Seeding events...');
  const events = await seedEvents(locations, sources);
  console.log(`✅ Created ${events.length} events\n`);

  // 6. Seed Timeline
  console.log('📅 Seeding timeline entries...');
  const timelineEntries = await seedTimeline(events, characters);
  console.log(`✅ Created ${timelineEntries.length} timeline entries\n`);

  console.log('🎉 Seed completed successfully!');
}

// ============================================================================
// SEED FUNCTIONS
// ============================================================================

async function seedSources() {
  const sources = [
    {
      type: 'HISTORY' as SourceType,
      title: '三国志 (Records of the Three Kingdoms)',
      author: '陈寿 (Chen Shou)',
      era: '3rd century (280-290 AD)',
      language: 'zh',
      reliability: 'PRIMARY' as ReliabilityTier,
      description: {
        zh: '官方正史，由晋朝史学家陈寿编撰，记录魏、蜀、吴三国历史',
        en: 'Official historical record compiled by Chen Shou during the Jin Dynasty, documenting the history of Wei, Shu, and Wu kingdoms',
      },
      metadata: {
        volumes: 65,
        period: '184-280 AD',
      },
    },
    {
      type: 'NOVEL' as SourceType,
      title: '三国演义 (Romance of the Three Kingdoms)',
      author: '罗贯中 (Luo Guanzhong)',
      era: '14th century (Ming Dynasty)',
      language: 'zh',
      reliability: 'FICTION' as ReliabilityTier,
      description: {
        zh: '中国四大名著之一，历史演义小说，在史实基础上进行文学创作',
        en: 'One of the Four Great Classical Novels of Chinese literature, a historical novel blending historical facts with literary dramatization',
      },
      metadata: {
        chapters: 120,
        genre: 'historical fiction',
      },
    },
  ];

  const created = [];
  for (const source of sources) {
    const s = await prisma.source.create({ data: source });
    created.push(s);
  }

  return created;
}

async function seedLocations() {
  const locations = [
    {
      name: { zh: '洛阳', en: 'Luoyang' },
      modernName: { zh: '河南省洛阳市', en: 'Luoyang, Henan Province' },
      type: 'CITY',
      coordinates: { latitude: 34.6197, longitude: 112.4540 },
      region: '中原 (Central Plains)',
      description: {
        zh: '东汉都城',
        en: 'Capital of the Eastern Han Dynasty',
      },
    },
    {
      name: { zh: '成都', en: 'Chengdu' },
      modernName: { zh: '四川省成都市', en: 'Chengdu, Sichuan Province' },
      type: 'CITY',
      coordinates: { latitude: 30.5728, longitude: 104.0668 },
      region: '益州 (Yi Province)',
      controllingKingdom: 'Shu',
      description: {
        zh: '蜀汉都城',
        en: 'Capital of Shu Han',
      },
    },
    {
      name: { zh: '建业', en: 'Jianye' },
      modernName: { zh: '江苏省南京市', en: 'Nanjing, Jiangsu Province' },
      type: 'CITY',
      coordinates: { latitude: 32.0603, longitude: 118.7969 },
      region: '扬州 (Yang Province)',
      controllingKingdom: 'Wu',
      description: {
        zh: '东吴都城（今南京）',
        en: 'Capital of Eastern Wu (modern-day Nanjing)',
      },
    },
  ];

  const created = [];
  for (const location of locations) {
    const l = await prisma.location.create({ data: location });
    created.push(l);
  }

  return created;
}

async function seedCharacters(locations: any[], sources: any[]) {
  // Get Luoyang as default birth location
  const luoyang = locations.find((l) => (l.name as any).zh === '洛阳');
  const historicalSource = sources.find((s) => s.type === 'HISTORY');
  const literarySource = sources.find((s) => s.type === 'NOVEL');

  const characters = [
    {
      canonicalName: { zh: '刘备', en: 'Liu Bei' },
      courtesyName: { zh: '玄德' },
      aliases: [{ zh: '刘皇叔' }],
      birthYear: 161,
      deathYear: 223,
      birthLocationId: luoyang?.id,
      kingdom: 'SHU' as Kingdom,
      socialClass: 'nobility',
      occupations: ['emperor', 'warlord'],
      historicalProfile: {
        summary: {
          zh: '蜀汉昭烈皇帝，汉室宗亲，以仁德著称，建立蜀汉政权',
          en: 'Emperor Zhaolie of Shu Han, member of Han royal family, known for benevolence, founded Shu Han regime',
        },
        personalityTraits: ['benevolent', 'persistent', 'charismatic'],
        achievements: [
          'Founded Shu Han dynasty',
          'Secured Yi Province',
          'Maintained Han legitimacy',
        ],
        sources: [historicalSource?.id],
      },
      literaryProfile: {
        summary: {
          zh: '仁义之君，三顾茅庐请诸葛亮，桃园三结义，以德服人',
          en: 'Righteous ruler, visited Zhuge Liang three times, sworn brotherhood at Peach Garden, ruled with virtue',
        },
        personalityTraits: ['humble', 'emotional', 'virtuous', 'tearful'],
        famousScenes: [
          'Peach Garden Oath',
          'Three visits to the thatched cottage',
          'Battle of Changban',
        ],
        sources: [literarySource?.id],
      },
      biography: {
        zh: '刘备是蜀汉的开国皇帝...',
        en: 'Liu Bei was the founding emperor of Shu Han...',
      },
      images: [],
      quotes: [],
      verified: true,
    },
    {
      canonicalName: { zh: '关羽', en: 'Guan Yu' },
      courtesyName: { zh: '云长' },
      aliases: [{ zh: '关公' }, { zh: '美髯公' }],
      birthYear: 160,
      deathYear: 220,
      kingdom: 'SHU' as Kingdom,
      socialClass: 'military',
      occupations: ['general'],
      historicalProfile: {
        summary: {
          zh: '蜀汉名将，以勇武著称，镇守荆州',
          en: 'Famous Shu Han general, known for bravery, defended Jing Province',
        },
        personalityTraits: ['loyal', 'brave', 'proud'],
        achievements: [
          'Defended Jing Province',
          'Captured Yu Jin',
          'Known for military prowess',
        ],
        sources: [historicalSource?.id],
      },
      literaryProfile: {
        summary: {
          zh: '义薄云天，忠义无双，过五关斩六将，千里走单骑',
          en: 'Supremely loyal and righteous, passed five passes and slayed six generals, rode alone for thousand miles',
        },
        personalityTraits: ['loyal', 'righteous', 'proud', 'fierce'],
        famousScenes: [
          'Peach Garden Oath',
          'Warm wine before slaying Hua Xiong',
          'Riding alone for thousand miles',
          'Flood attack on Seven Armies',
        ],
        sources: [literarySource?.id],
      },
      biography: {
        zh: '关羽是蜀汉五虎上将之首...',
        en: 'Guan Yu was the first of the Five Tiger Generals of Shu Han...',
      },
      images: [],
      quotes: [],
      verified: true,
    },
    {
      canonicalName: { zh: '张飞', en: 'Zhang Fei' },
      courtesyName: { zh: '益德' },
      aliases: [{ zh: '张翼德' }],
      birthYear: 165,
      deathYear: 221,
      kingdom: 'SHU' as Kingdom,
      socialClass: 'military',
      occupations: ['general'],
      historicalProfile: {
        summary: {
          zh: '蜀汉名将，勇猛善战',
          en: 'Famous Shu Han general, brave and fierce warrior',
        },
        personalityTraits: ['brave', 'fierce', 'impulsive'],
        achievements: [
          'Defended against Cao Cao',
          'Secured Ba Commandery',
        ],
        sources: [historicalSource?.id],
      },
      literaryProfile: {
        summary: {
          zh: '性格暴躁但勇猛过人，当阳桥喝退曹军',
          en: 'Hot-tempered but extraordinarily brave, roared and scared off Cao Cao\'s army at Changban Bridge',
        },
        personalityTraits: ['brave', 'fierce', 'hot-tempered', 'loyal'],
        famousScenes: [
          'Peach Garden Oath',
          'Roar at Changban Bridge',
          'Battle against Lu Bu',
        ],
        sources: [literarySource?.id],
      },
      biography: {
        zh: '张飞是蜀汉五虎上将之一...',
        en: 'Zhang Fei was one of the Five Tiger Generals of Shu Han...',
      },
      images: [],
      quotes: [],
      verified: true,
    },
  ];

  const created = [];
  for (const character of characters) {
    const c = await prisma.character.create({ data: character });
    created.push(c);
  }

  return created;
}

async function seedRelationships(characters: any[]) {
  // Find all major characters
  const liuBei = characters.find((c) => (c.canonicalName as any).zh === '刘备');
  const guanYu = characters.find((c) => (c.canonicalName as any).zh === '关羽');
  const zhangFei = characters.find((c) => (c.canonicalName as any).zh === '张飞');
  const caoCao = characters.find((c) => (c.canonicalName as any).zh === '曹操');
  const sunQuan = characters.find((c) => (c.canonicalName as any).zh === '孙权');
  const zhuGeLiang = characters.find((c) => (c.canonicalName as any).zh === '诸葛亮');
  const lvBu = characters.find((c) => (c.canonicalName as any).zh === '吕布');
  const dongZhuo = characters.find((c) => (c.canonicalName as any).zh === '董卓');
  const yuanShao = characters.find((c) => (c.canonicalName as any).zh === '袁绍');
  const sunCe = characters.find((c) => (c.canonicalName as any).zh === '孙策');

  if (!liuBei || !guanYu || !zhangFei) {
    console.log('⚠️  Could not find main characters, skipping relationships');
    return [];
  }

  const relationships = [
    {
      characterAId: liuBei.id,
      characterBId: guanYu.id,
      relationshipType: 'SWORN_BROTHER',
      relationshipSource: 'LITERARY', // Peach Garden Oath is from novel
      sources: [],
      startYear: 184,
      description: {
        zh: '桃园结义的异姓兄弟',
        en: 'Sworn brothers from Peach Garden Oath',
      },
      strength: 10,
      isReciprocal: true,
    },
    {
      characterAId: liuBei.id,
      characterBId: zhangFei.id,
      relationshipType: 'SWORN_BROTHER',
      relationshipSource: 'LITERARY',
      sources: [],
      startYear: 184,
      description: {
        zh: '桃园结义的异姓兄弟',
        en: 'Sworn brothers from Peach Garden Oath',
      },
      strength: 10,
      isReciprocal: true,
    },
    {
      characterAId: guanYu.id,
      characterBId: zhangFei.id,
      relationshipType: 'SWORN_BROTHER',
      relationshipSource: 'LITERARY',
      sources: [],
      startYear: 184,
      description: {
        zh: '桃园结义的异姓兄弟',
        en: 'Sworn brothers from Peach Garden Oath',
      },
      strength: 10,
      isReciprocal: true,
    },
    {
      characterAId: liuBei.id,
      characterBId: guanYu.id,
      relationshipType: 'LORD_VASSAL',
      relationshipSource: 'BOTH', // Historical relationship
      sources: [],
      startYear: 184,
      description: {
        zh: '君臣关系，关羽效忠刘备',
        en: 'Lord-vassal relationship, Guan Yu served Liu Bei',
      },
      strength: 9,
      isReciprocal: false,
    },
    {
      characterAId: liuBei.id,
      characterBId: zhangFei.id,
      relationshipType: 'LORD_VASSAL',
      relationshipSource: 'BOTH',
      sources: [],
      startYear: 184,
      description: {
        zh: '君臣关系，张飞效忠刘备',
        en: 'Lord-vassal relationship, Zhang Fei served Liu Bei',
      },
      strength: 9,
      isReciprocal: false,
    },
  ];

  // Add relationships for other characters if they exist
  if (zhuGeLiang && liuBei) {
    relationships.push({
      characterAId: liuBei.id,
      characterBId: zhuGeLiang.id,
      relationshipType: 'LORD_VASSAL',
      relationshipSource: 'BOTH',
      sources: [],
      startYear: 207,
      description: {
        zh: '三顾茅庐后的君臣关系',
        en: 'Lord-vassal relationship after Three Visits to the Thatched Cottage',
      },
      strength: 10,
      isReciprocal: false,
    });
  }

  if (caoCao && liuBei) {
    relationships.push({
      characterAId: caoCao.id,
      characterBId: liuBei.id,
      relationshipType: 'RIVAL',
      relationshipSource: 'BOTH',
      sources: [],
      startYear: 190,
      description: {
        zh: '一生的对手，争夺天下',
        en: 'Lifelong rivals competing for control of China',
      },
      strength: 9,
      isReciprocal: true,
    });
  }

  if (sunQuan && liuBei) {
    relationships.push({
      characterAId: sunQuan.id,
      characterBId: liuBei.id,
      relationshipType: 'FRIEND',
      relationshipSource: 'BOTH',
      sources: [],
      startYear: 208,
      endYear: 219,
      description: {
        zh: '赤壁之战后的盟友',
        en: 'Allies after the Battle of Red Cliffs',
      },
      strength: 6,
      isReciprocal: true,
    });
  }

  if (caoCao && sunQuan) {
    relationships.push({
      characterAId: caoCao.id,
      characterBId: sunQuan.id,
      relationshipType: 'ENEMY',
      relationshipSource: 'BOTH',
      sources: [],
      startYear: 208,
      description: {
        zh: '赤壁之战的敌对关系',
        en: 'Enemies since the Battle of Red Cliffs',
      },
      strength: 8,
      isReciprocal: true,
    });
  }

  if (lvBu && dongZhuo) {
    relationships.push({
      characterAId: dongZhuo.id,
      characterBId: lvBu.id,
      relationshipType: 'LORD_VASSAL',
      relationshipSource: 'BOTH',
      sources: [],
      startYear: 189,
      endYear: 192,
      description: {
        zh: '义父义子关系，最终吕布杀董卓',
        en: 'Adoptive father-son relationship, ended when Lü Bu killed Dong Zhuo',
      },
      strength: 5,
      isReciprocal: false,
    });
  }

  if (lvBu && caoCao) {
    relationships.push({
      characterAId: lvBu.id,
      characterBId: caoCao.id,
      relationshipType: 'ENEMY',
      relationshipSource: 'BOTH',
      sources: [],
      startYear: 195,
      endYear: 199,
      description: {
        zh: '白门楼曹操斩吕布',
        en: 'Enemies, Cao Cao executed Lü Bu at White Gate Tower',
      },
      strength: 8,
      isReciprocal: true,
    });
  }

  if (yuanShao && caoCao) {
    relationships.push({
      characterAId: yuanShao.id,
      characterBId: caoCao.id,
      relationshipType: 'RIVAL',
      relationshipSource: 'BOTH',
      sources: [],
      startYear: 190,
      endYear: 200,
      description: {
        zh: '昔日盟友，官渡之战成为敌手',
        en: 'Former allies turned rivals at the Battle of Guandu',
      },
      strength: 9,
      isReciprocal: true,
    });
  }

  if (sunCe && sunQuan) {
    relationships.push({
      characterAId: sunCe.id,
      characterBId: sunQuan.id,
      relationshipType: 'FAMILY',
      relationshipSource: 'BOTH',
      sources: [],
      startYear: null,
      endYear: null,
      description: {
        zh: '兄弟关系，孙策是孙权的哥哥',
        en: 'Brothers, Sun Ce is the elder brother of Sun Quan',
      },
      strength: 10,
      isReciprocal: true,
    });
  }

  const created = [];
  for (const relationship of relationships) {
    try {
      const r = await prisma.characterRelationship.create({ data: relationship });
      created.push(r);
    } catch (error) {
      // Skip if character doesn't exist
      console.log(`⚠️  Skipping relationship: ${error}`);
    }
  }

  return created;
}

async function seedEvents(locations: any[], sources: any[]) {
  const historicalSource = sources.find((s) => s.type === 'HISTORY');
  const literarySource = sources.find((s) => s.type === 'NOVEL');

  const events = [
    {
      name: { zh: '黄巾起义', en: 'Yellow Turban Rebellion' },
      type: 'POLITICAL',
      dateYear: 184,
      datePrecision: 'EXACT',
      description: {
        zh: '道教太平道信徒发起的大规模农民起义，标志着东汉末年动乱的开始',
        en: 'Large-scale peasant uprising led by Taoist Taiping followers, marking the beginning of late Eastern Han turmoil',
      },
      historicalAccount: {
        summary: '184年，张角领导的黄巾军起义席卷全国',
        sources: [historicalSource?.id],
      },
      literaryAccount: {
        summary: '黄巾贼起，天下大乱，刘关张于此时桃园结义',
        sources: [literarySource?.id],
      },
      participants: [],
      outcomes: [],
      leadsToEventIds: [],
    },
  ];

  const created = [];
  for (const event of events) {
    const e = await prisma.event.create({ data: event });
    created.push(e);
  }

  return created;
}

async function seedTimeline(events: any[], characters: any[]) {
  const entries = [
    {
      year: 161,
      description: { zh: '刘备出生', en: 'Liu Bei born' },
      importance: 8,
      category: 'birth',
    },
    {
      year: 184,
      eventId: events[0]?.id,
      importance: 10,
      category: 'rebellion',
    },
  ];

  const created = [];
  for (const entry of entries) {
    const e = await prisma.timelineEntry.create({ data: entry });
    created.push(e);
  }

  return created;
}

// ============================================================================
// RUN
// ============================================================================

main()
  .catch((e) => {
    console.error('❌ Seed failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
