# 三国演义 / Romance of the Three Kingdoms

<div align="center">

📚 **A Digital Archive of China's Classic Historical Novel** 📚

*Complete text of all 120 chapters in the original Chinese*

[![License](https://img.shields.io/badge/license-TBD-blue.svg)](LICENSE)
[![Chapters](https://img.shields.io/badge/chapters-120-green.svg)](src/)
[![Encoding](https://img.shields.io/badge/encoding-UTF--8-brightgreen.svg)](src/)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-2.1.0+-purple.svg)](https://code.claude.com)

</div>

---

## 📖 About This Project

Romance of the Three Kingdoms (三国演义, *Sānguó Yǎnyì*) is one of the **Four Great Classical Novels** of Chinese literature. Written by Luo Guanzhong in the 14th century, it chronicles the turbulent period between the late Eastern Han Dynasty and the Three Kingdoms period (169-280 AD).

This repository contains the complete text of all **120 chapters** in the original Chinese, providing:
- A preserved digital archive
- Foundation for text analysis and research
- Educational resource for Chinese literature and history
- Dataset for natural language processing

## 🗂️ Repository Structure

```
Romance-of-the-Three-Kingdoms/
├── src/                      # All 120 chapters as individual .txt files
├── .claude/                  # Claude Code configuration
│   └── commands/            # Custom slash commands
├── CLAUDE.md                # Project guidelines for Claude Code
├── CLAUDE.local.md.template # Template for personal preferences
├── PROJECT_PLANNING.md      # Roadmap and planning documentation
├── SKILLS.md                # Guide for Claude Code skills
├── README.md                # This file
└── .gitignore               # Git ignore patterns
```

## 🚀 Quick Start

### Prerequisites
- Git
- Text editor with UTF-8 support
- (Optional) Claude Code for enhanced development experience

### Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/Romance-of-the-Three-Kingdoms.git
cd Romance-of-the-Three-Kingdoms

# View a chapter
cat "src/1.宴桃园豪杰三结义 斩黄巾英雄首立功.txt"

# Search for a character
grep -r "刘备" src/

# Count total chapters
ls src/*.txt | wc -l
```

## 📚 Chapter Organization

All chapters are stored in the `src/` directory with the naming convention:

```
{number}.{chapter_title}.txt
```

**Examples**:
- `1.宴桃园豪杰三结义 斩黄巾英雄首立功.txt` - Chapter 1: The Oath at the Peach Garden
- `50.诸葛亮智算华容 关云长义释曹操.txt` - Chapter 50: Zhuge Liang's Strategy at Huarong
- `120.荐杜预老将献新谋 降孙皓三分归一统.txt` - Chapter 120: The Unification

## 🎯 Use Cases

### Academic Research
- Character development analysis
- Narrative structure studies
- Historical vs. fictional comparison
- Literary device identification

### Education
- Chinese language learning
- Historical context teaching
- Classical literature study
- Cultural studies

### Technical Applications
- NLP model training
- Text classification
- Named entity recognition
- Translation memory

### Creative Projects
- Character inspiration
- Plot structure reference
- Historical fiction research
- Game development

## 🛠️ Claude Code Integration

This project is optimized for use with [Claude Code](https://code.claude.com), featuring:

### Custom Commands

Use these slash commands for common tasks:

- **`/analyze-chapter`** - Comprehensive chapter analysis
- **`/search-character`** - Find character mentions across all chapters
- **`/verify-integrity`** - Check repository integrity
- **`/extract-quotes`** - Find and extract specific passages

### Configuration Files

- **`CLAUDE.md`** - Shared project guidelines (version controlled)
- **`CLAUDE.local.md`** - Personal preferences (gitignored, use template)
- **`.claude/commands/`** - Custom command definitions

For detailed information, see [SKILLS.md](SKILLS.md).

## 📊 Project Statistics

- **Total Chapters**: 120
- **Encoding**: UTF-8
- **Language**: Chinese (Simplified)
- **File Format**: Plain text (.txt)
- **Total Characters**: ~800,000 (approximate)
- **Historical Period Covered**: 169-280 AD

## 🗺️ Roadmap

See [PROJECT_PLANNING.md](PROJECT_PLANNING.md) for detailed roadmap.

### Current Phase: Foundation ✅
- [x] Import all 120 chapters
- [x] Establish conventions
- [x] Set up Claude Code configuration
- [x] Create documentation

### Next Phase: Data Enhancement
- [ ] Add chapter metadata
- [ ] Create character index
- [ ] Build location reference
- [ ] Add chapter summaries

### Future Phases
- Analysis tools
- Translation support
- Interactive features

## 🤝 Contributing

Contributions are welcome! Areas where you can help:

- **Translation**: English summaries and key passages
- **Metadata**: Character lists, historical context
- **Analysis**: Text analysis scripts and tools
- **Documentation**: Improved guides and references
- **Research**: Historical accuracy verification

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Read [CLAUDE.md](CLAUDE.md) for project guidelines
4. Make your changes
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

**Important**: Never modify original chapter text without explicit discussion and approval.

## 📖 Historical Context

### The Three Kingdoms Period (220-280 AD)

After the collapse of the Han Dynasty, China split into three rival kingdoms:

- **Wei (魏)** - Led by Cao Cao and his descendants, controlled northern China
- **Shu (蜀)** - Led by Liu Bei, controlled Sichuan region
- **Wu (吴)** - Led by Sun Quan, controlled southeastern China

### Key Historical Figures

- **Liu Bei (刘备)** - Shu Han founder, portrayed as virtuous ruler
- **Cao Cao (曹操)** - Wei founder, brilliant strategist
- **Sun Quan (孙权)** - Wu founder, skilled administrator
- **Zhuge Liang (诸葛亮)** - Liu Bei's strategist, legendary wisdom
- **Guan Yu (关羽)** - Liu Bei's sworn brother, symbol of loyalty
- **Zhang Fei (张飞)** - Liu Bei's sworn brother, fierce warrior

### Cultural Significance

Romance of the Three Kingdoms has profoundly influenced:
- Chinese culture and values
- Military strategy and tactics
- Leadership philosophy
- Popular culture (games, movies, TV)
- Proverbs and idioms

## 📝 License

*License to be determined*

Options under consideration:
- Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)
- Public Domain (CC0)
- Open Database License (ODbL)

## 🙏 Acknowledgments

- **Original Author**: Luo Guanzhong (罗贯中)
- **Historical Sources**: *Records of the Three Kingdoms* by Chen Shou
- **Digital Preservation**: Various public domain sources
- **Claude Code**: Development environment and tooling

## 📧 Contact

For questions, suggestions, or collaboration inquiries:
- Open an issue in this repository
- Check [PROJECT_PLANNING.md](PROJECT_PLANNING.md) for project status

## 🔗 Related Resources

### Academic
- Chinese Text Project: [ctext.org](https://ctext.org)
- Records of the Three Kingdoms (historical source)

### Popular Culture
- Three Kingdoms video games series
- TV adaptations and films
- Modern adaptations and retellings

### Technical
- Chinese NLP resources
- Classical Chinese language tools
- Digital humanities projects

---

<div align="center">

**Built with ❤️ for classical Chinese literature preservation**

⭐ Star this repo if you find it useful! ⭐

</div>
