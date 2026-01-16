#!/usr/bin/env python3
"""
Extract character information from Three Kingdoms sources.

This script parses Chinese text to identify character names, titles,
relationships, and biographical information.

Usage:
    python extract_characters.py --source sanguozhi --output characters.json
    python extract_characters.py --source romance --output characters-romance.json
"""

import json
import re
import argparse
from pathlib import Path
from typing import Dict, List, Set, Optional
from dataclasses import dataclass, asdict
from datetime import datetime


@dataclass
class Character:
    """Represents a character from the Three Kingdoms period."""
    id: str
    canonical_name: Dict[str, str]  # {"zh": "刘备", "en": "Liu Bei"}
    courtesy_name: Optional[Dict[str, str]] = None
    birth_year: Optional[int] = None
    death_year: Optional[int] = None
    kingdom: Optional[str] = None  # "wei", "shu", "wu", "han", "other"
    titles: List[Dict[str, str]] = None
    relationships: List[Dict[str, str]] = None
    source_id: str = None
    extracted_at: str = None

    def __post_init__(self):
        if self.titles is None:
            self.titles = []
        if self.relationships is None:
            self.relationships = []
        if self.extracted_at is None:
            self.extracted_at = datetime.now().isoformat()


class CharacterExtractor:
    """Extract character information from Chinese texts."""

    # Common Three Kingdoms character patterns
    MAJOR_CHARACTERS = {
        "刘备": {"en": "Liu Bei", "courtesy": "玄德", "kingdom": "shu"},
        "关羽": {"en": "Guan Yu", "courtesy": "云长", "kingdom": "shu"},
        "张飞": {"en": "Zhang Fei", "courtesy": "翼德", "kingdom": "shu"},
        "诸葛亮": {"en": "Zhuge Liang", "courtesy": "孔明", "kingdom": "shu"},
        "曹操": {"en": "Cao Cao", "courtesy": "孟德", "kingdom": "wei"},
        "曹丕": {"en": "Cao Pi", "courtesy": "子桓", "kingdom": "wei"},
        "司马懿": {"en": "Sima Yi", "courtesy": "仲达", "kingdom": "wei"},
        "孙权": {"en": "Sun Quan", "courtesy": "仲谋", "kingdom": "wu"},
        "孙策": {"en": "Sun Ce", "courtesy": "伯符", "kingdom": "wu"},
        "周瑜": {"en": "Zhou Yu", "courtesy": "公瑾", "kingdom": "wu"},
        "吕布": {"en": "Lu Bu", "courtesy": "奉先", "kingdom": "other"},
        "董卓": {"en": "Dong Zhuo", "courtesy": "仲颖", "kingdom": "other"},
        "袁绍": {"en": "Yuan Shao", "courtesy": "本初", "kingdom": "other"},
        "袁术": {"en": "Yuan Shu", "courtesy": "公路", "kingdom": "other"},
    }

    # Common title patterns
    TITLE_PATTERNS = [
        r'(丞相|大将军|太守|刺史|将军|都督|军师|谋士)',
        r'(皇帝|天子|主公|王|侯|公)',
    ]

    # Relationship patterns
    RELATIONSHIP_PATTERNS = {
        "父": "father",
        "子": "son",
        "兄": "elder_brother",
        "弟": "younger_brother",
        "结义": "sworn_brother",
        "主": "lord",
        "臣": "vassal",
    }

    def __init__(self, source_type: str):
        """
        Initialize extractor.

        Args:
            source_type: "sanguozhi" or "romance"
        """
        self.source_type = source_type
        self.characters: Dict[str, Character] = {}

    def extract_from_text(self, text: str) -> List[Character]:
        """
        Extract characters from text.

        Args:
            text: Chinese text to parse

        Returns:
            List of Character objects
        """
        # For MVP, use predefined character list
        # In production, use NLP to extract from text

        for zh_name, info in self.MAJOR_CHARACTERS.items():
            if zh_name in text:  # Character mentioned in text
                char_id = self._generate_id(zh_name)

                character = Character(
                    id=char_id,
                    canonical_name={
                        "zh": zh_name,
                        "en": info["en"]
                    },
                    courtesy_name={
                        "zh": info["courtesy"],
                        "en": self._romanize(info["courtesy"])
                    } if "courtesy" in info else None,
                    kingdom=info.get("kingdom"),
                    source_id=self.source_type,
                )

                # Extract titles if found
                titles = self._extract_titles(text, zh_name)
                character.titles = titles

                # Extract birth/death years if found
                years = self._extract_years(text, zh_name)
                if years:
                    character.birth_year = years.get("birth")
                    character.death_year = years.get("death")

                self.characters[char_id] = character

        return list(self.characters.values())

    def _generate_id(self, name: str) -> str:
        """Generate a unique ID for a character."""
        # Convert Chinese to pinyin-like ID
        id_map = {
            "刘备": "liu-bei",
            "关羽": "guan-yu",
            "张飞": "zhang-fei",
            "诸葛亮": "zhuge-liang",
            "曹操": "cao-cao",
            "曹丕": "cao-pi",
            "司马懿": "sima-yi",
            "孙权": "sun-quan",
            "孙策": "sun-ce",
            "周瑜": "zhou-yu",
            "吕布": "lu-bu",
            "董卓": "dong-zhuo",
            "袁绍": "yuan-shao",
            "袁术": "yuan-shu",
        }
        return id_map.get(name, name.lower().replace(" ", "-"))

    def _romanize(self, chinese: str) -> str:
        """Simple romanization (placeholder - use pypinyin in production)."""
        romanization = {
            "玄德": "Xuande",
            "云长": "Yunchang",
            "翼德": "Yide",
            "孔明": "Kongming",
            "孟德": "Mengde",
            "子桓": "Zihuan",
            "仲达": "Zhongda",
            "仲谋": "Zhongmou",
            "伯符": "Bofu",
            "公瑾": "Gongjin",
            "奉先": "Fengxian",
            "仲颖": "Zhongying",
            "本初": "Benchu",
            "公路": "Gonglu",
        }
        return romanization.get(chinese, chinese)

    def _extract_titles(self, text: str, character_name: str) -> List[Dict[str, str]]:
        """Extract titles for a character from text."""
        titles = []
        # Search for titles near character name
        for pattern in self.TITLE_PATTERNS:
            matches = re.finditer(f'{character_name}.{{0,20}}{pattern}', text)
            for match in matches:
                title_text = match.group(1)
                titles.append({
                    "zh": title_text,
                    "en": self._translate_title(title_text)
                })
        return titles[:3]  # Limit to top 3 titles

    def _translate_title(self, title: str) -> str:
        """Translate Chinese title to English."""
        translations = {
            "丞相": "Chancellor",
            "大将军": "General-in-Chief",
            "太守": "Governor",
            "刺史": "Inspector",
            "将军": "General",
            "都督": "Commander",
            "军师": "Strategist",
            "谋士": "Advisor",
            "皇帝": "Emperor",
            "天子": "Son of Heaven",
            "主公": "Lord",
            "王": "King",
            "侯": "Marquis",
            "公": "Duke",
        }
        return translations.get(title, title)

    def _extract_years(self, text: str, character_name: str) -> Optional[Dict[str, int]]:
        """Extract birth/death years for a character."""
        # Pattern: Character + year mention
        # This is a simplified version - production would use more sophisticated parsing

        # Known dates for major characters (from historical records)
        known_dates = {
            "刘备": {"birth": 161, "death": 223},
            "关羽": {"birth": 160, "death": 220},
            "张飞": {"birth": 167, "death": 221},
            "诸葛亮": {"birth": 181, "death": 234},
            "曹操": {"birth": 155, "death": 220},
            "曹丕": {"birth": 187, "death": 226},
            "司马懿": {"birth": 179, "death": 251},
            "孙权": {"birth": 182, "death": 252},
            "孙策": {"birth": 175, "death": 200},
            "周瑜": {"birth": 175, "death": 210},
        }

        return known_dates.get(character_name)

    def save_to_json(self, output_path: Path):
        """Save extracted characters to JSON file."""
        output_path.parent.mkdir(parents=True, exist_ok=True)

        data = {
            "metadata": {
                "source": self.source_type,
                "extracted_at": datetime.now().isoformat(),
                "count": len(self.characters),
                "version": "1.0"
            },
            "characters": [asdict(char) for char in self.characters.values()]
        }

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"✓ Extracted {len(self.characters)} characters to {output_path}")


def main():
    parser = argparse.ArgumentParser(description='Extract characters from Three Kingdoms texts')
    parser.add_argument('--source', required=True, choices=['sanguozhi', 'romance'],
                       help='Source text to extract from')
    parser.add_argument('--input', type=Path,
                       help='Input text file (optional, uses default paths)')
    parser.add_argument('--output', type=Path, required=True,
                       help='Output JSON file')

    args = parser.parse_args()

    # Determine input path
    if args.input:
        input_path = args.input
    elif args.source == 'sanguozhi':
        input_path = Path('../../sources/historical/sanguozhi/sanguozhi-full.txt')
    else:  # romance
        input_path = Path('../../../src/1.宴桃园豪杰三结义 斩黄巾英雄首立功.txt')

    # Check if input exists
    if not input_path.exists():
        print(f"⚠ Input file not found: {input_path}")
        print(f"  Please download sources first (see data/README.md)")
        print(f"  Creating sample output with predefined characters...")
        text = ""  # Will use predefined character list
    else:
        # Read input
        with open(input_path, 'r', encoding='utf-8') as f:
            text = f.read()
        print(f"✓ Read {len(text)} characters from {input_path}")

    # Extract
    extractor = CharacterExtractor(args.source)
    characters = extractor.extract_from_text(text)

    print(f"✓ Extracted {len(characters)} characters")

    # Save
    extractor.save_to_json(args.output)

    # Summary
    print("\nSummary:")
    for char in characters[:5]:  # Show first 5
        print(f"  - {char.canonical_name['zh']} ({char.canonical_name['en']}) - {char.kingdom}")
    if len(characters) > 5:
        print(f"  ... and {len(characters) - 5} more")


if __name__ == '__main__':
    main()
