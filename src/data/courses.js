export const courses = [
  {
    id: 'c1',
    order: 1,
    title: 'Computer Basics',
    subtitle: 'The Foundation',
    goal: 'Get absolute beginners comfortable with their machine.',
    modules: [
      {
        id: 'c1m1',
        title: 'Understanding the Hardware',
        summary: 'What is a CPU, RAM, storage, and peripherals — and why each one matters.',
        content: [
          'The CPU (Central Processing Unit) is the brain of your computer — it executes instructions, one after another, billions of times per second.',
          'RAM (Random Access Memory) is short-term memory. It holds what your computer is actively working on right now, and it clears when you shut down.',
          'Storage (an HDD or SSD) is long-term memory. It keeps your files, photos, and programs even after the power goes off. SSDs are faster than older HDDs.',
          'Peripherals are anything you plug in or connect: a mouse, keyboard, monitor, printer, or webcam. They let you talk to the machine and let it talk back.',
        ],
      },
      {
        id: 'c1m2',
        title: 'Navigating the Operating System',
        summary: 'Windows/Linux basics, files, folders, and settings.',
        content: [
          'The operating system (OS) is the manager that lets every program share the same hardware — Windows, macOS, and Linux are the three you will meet most often.',
          'Everything you save lives inside a folder (also called a directory). Folders can hold other folders, forming a tree — just like chapters and sub-sections in a book.',
          'The Settings (or Control Panel) app is where you control how the system behaves: display brightness, Wi-Fi, sound, and installed apps.',
          'Learning to navigate File Explorer (Windows) or the Files app (Linux) means you always know where something is saved — the #1 skill that prevents "I can\'t find my file" panic.',
        ],
      },
      {
        id: 'c1m3',
        title: 'Essential Keyboard Shortcuts',
        summary: 'Ctrl+C, Ctrl+V, Ctrl+Z, Alt+Tab — and why they save you hours.',
        content: [
          'Ctrl+C copies, Ctrl+V pastes, Ctrl+X cuts. These three shortcuts alone replace dozens of mouse clicks a day.',
          'Ctrl+Z undoes your last action — the most forgiving shortcut in existence. Ctrl+Y (or Ctrl+Shift+Z) redoes it.',
          'Alt+Tab switches between open windows instantly, without reaching for the mouse.',
          'Ctrl+F opens a search bar inside almost any app or webpage — use it before scrolling manually through a long page.',
        ],
      },
      {
        id: 'c1m4',
        title: 'Basic Maintenance and Safety',
        summary: 'Keeping the OS updated and troubleshooting common issues.',
        content: [
          'Updates patch security holes. An outdated OS is the easiest target for malware — set updates to install automatically when possible.',
          'Restarting your computer clears temporary memory glitches — it fixes a surprising percentage of "it\'s just acting weird" problems.',
          'Task Manager (Windows) or System Monitor (Linux) shows you which programs are using too much CPU or memory when something is running slow.',
          'Always keep one backup of anything irreplaceable — a second copy on a cloud drive or external disk costs little and saves everything.',
        ],
      },
    ],
  },
  {
    id: 'c2',
    order: 2,
    title: 'Setting Up Your Workspace',
    subtitle: 'Essential Apps',
    goal: 'Learn to safely source, download, and install trusted software.',
    modules: [
      {
        id: 'c2m1',
        title: 'Anatomy of a Safe Download',
        summary: 'Identifying official websites vs. sketchy third-party ads.',
        content: [
          'Always download software from the developer\'s official website or a trusted store (Microsoft Store, official Linux repositories) — never from a random link in an ad.',
          'Check the URL carefully. Fake sites often use lookalike domains (e.g. "official-chrome-download.net" instead of google.com).',
          'Be suspicious of any download page with flashing "Download Now" buttons that don\'t match the software you searched for — those are usually ads, not the real link.',
          'A legitimate installer will show the publisher\'s verified name in the security prompt before it runs. If it says "Unknown Publisher," stop and double-check the source.',
        ],
      },
      {
        id: 'c2m2',
        title: 'Setting Up Productivity Tools',
        summary: 'Downloading and installing MS Office or LibreOffice.',
        content: [
          'LibreOffice is a free, open-source alternative to Microsoft Office, and opens .docx, .xlsx, and .pptx files without a subscription.',
          'Download LibreOffice only from libreoffice.org. For MS Office, use Microsoft\'s official site or your institution\'s licensed portal.',
          'After installing, set your default file format (e.g. .docx) in the app\'s settings so files stay compatible with classmates and employers who use Microsoft Office.',
          'Enable auto-save so your document is protected the moment your machine loses power or the app closes unexpectedly.',
        ],
      },
      {
        id: 'c2m3',
        title: 'Setting Up a Browser',
        summary: 'Installing Chrome or Brave cleanly, without bundled extras.',
        content: [
          'Download browsers only from google.com/chrome or brave.com — never a mirror or third-party site.',
          'During installation, uncheck any boxes that offer to install a "recommended toolbar" or change your homepage — those are usually unwanted add-ons.',
          'After installing, sign in with an account to sync bookmarks and passwords safely across devices.',
          'Turn on the browser\'s built-in Safe Browsing / phishing protection in Settings before you start browsing.',
        ],
      },
      {
        id: 'c2m4',
        title: 'Setting Up a Development Environment',
        summary: 'Downloading and configuring code editors/IDEs like VS Code.',
        content: [
          'VS Code (code.visualstudio.com) is a free, lightweight code editor used across nearly every programming language and industry.',
          'Dev-C++ is a simpler, beginner-friendly IDE often used in introductory C/C++ courses.',
          'After installing VS Code, add the extensions for your language (e.g. Python, C++) from the built-in Extensions Marketplace — never from an external .zip file.',
          'Configure your editor\'s auto-save and formatting settings once, at the start, so good habits are automatic instead of manual.',
        ],
      },
    ],
  },
  {
    id: 'c3',
    order: 3,
    title: 'Master Class in Effective Browsing',
    subtitle: 'Information Literacy',
    goal: 'Filter out the noise and find exactly what you need on the internet.',
    modules: [
      {
        id: 'c3m1',
        title: 'Understanding Search Intent',
        summary: 'How search engines read keywords, not full sentences.',
        content: [
          'Search engines match keywords and patterns, not conversational meaning — "best budget laptop 2026" works better than "what laptop should I buy."',
          'Put your most specific, most important word first — search engines weigh early terms more heavily.',
          'Remove filler words (the, is, a) from your query; they rarely change the results but dilute your keywords.',
          'If your first search doesn\'t work, don\'t just reread the results — rephrase the query itself with a different angle.',
        ],
      },
      {
        id: 'c3m2',
        title: 'Google Search Operators',
        summary: 'Using "exact match", site:, filetype:, and -minus to search precisely.',
        content: [
          'Quotation marks ("exact phrase") force the engine to match that exact wording, useful for error messages or quotes.',
          'site:edu or site:gov restricts results to a specific domain — great for filtering out blogs and ads when researching a topic.',
          'filetype:pdf finds only PDF documents — useful for finding official reports, papers, or slides.',
          'A minus sign (-) before a word excludes it, e.g. "jaguar -car" removes car results when researching the animal.',
        ],
      },
      {
        id: 'c3m3',
        title: 'Evaluating Information',
        summary: 'Spotting reliable sources, misinformation, and secure sites.',
        content: [
          'Check the author and publisher — is this a known institution, journalist, or an anonymous blog with no credentials?',
          'Look for a padlock and "https://" in the address bar — it means the connection is encrypted, though it does not guarantee the content is true.',
          'Cross-check surprising claims against at least one other independent, reputable source before accepting them.',
          'Be wary of emotionally charged headlines — misinformation often relies on outrage to spread faster than fact-checking can catch up.',
        ],
      },
      {
        id: 'c3m4',
        title: 'Managing Your Digital Footprint',
        summary: 'Bookmarks, history cleanup, and using extensions safely.',
        content: [
          'Bookmarks organized into folders turn your browser into a personal research library instead of a messy history list.',
          'Clearing your browsing history and cache periodically improves both privacy and browser speed.',
          'Only install browser extensions from the official Chrome Web Store or Firefox Add-ons, and check what permissions each one requests.',
          'Review your installed extensions every few months — remove anything you no longer use or don\'t remember installing.',
        ],
      },
    ],
  },
];

// Final assessment: pulled from across all three courses.
export const finalAssessment = [
  {
    id: 'q1',
    question: 'What does RAM do?',
    options: [
      'Permanently stores files even when powered off',
      'Temporarily holds what the computer is actively working on',
      'Displays images on the screen',
      'Connects the computer to the internet',
    ],
    answer: 1,
  },
  {
    id: 'q2',
    question: 'Which shortcut undoes your last action?',
    options: ['Alt+Tab', 'Ctrl+F', 'Ctrl+Z', 'Ctrl+C'],
    answer: 2,
  },
  {
    id: 'q3',
    question: 'Why should you keep your OS updated?',
    options: [
      'It makes the wallpaper nicer',
      'It patches security vulnerabilities',
      'It is required to use a keyboard',
      'It has no real benefit',
    ],
    answer: 1,
  },
  {
    id: 'q4',
    question: 'What is a warning sign of an unsafe download page?',
    options: [
      'The URL matches the official developer domain',
      'A verified publisher name appears in the install prompt',
      'Flashing "Download Now" buttons unrelated to your search',
      'The file is hosted on the software\'s own website',
    ],
    answer: 2,
  },
  {
    id: 'q5',
    question: 'What is LibreOffice?',
    options: [
      'A web browser',
      'A free, open-source office suite',
      'An antivirus program',
      'A code editor',
    ],
    answer: 1,
  },
  {
    id: 'q6',
    question: 'What should you do during browser installation to avoid unwanted add-ons?',
    options: [
      'Uncheck boxes offering extra toolbars or homepage changes',
      'Always accept every default option quickly',
      'Disable the internet first',
      'Install every recommended extension',
    ],
    answer: 0,
  },
  {
    id: 'q7',
    question: 'What does the search operator site:edu do?',
    options: [
      'Excludes .edu websites',
      'Searches only within .edu websites',
      'Finds only PDF files',
      'Searches for an exact phrase',
    ],
    answer: 1,
  },
  {
    id: 'q8',
    question: 'A minus sign before a word in a search (e.g. "jaguar -car") does what?',
    options: [
      'Forces an exact phrase match',
      'Excludes that word from the results',
      'Searches only PDF files',
      'Has no effect',
    ],
    answer: 1,
  },
  {
    id: 'q9',
    question: 'What is the best first step when evaluating a surprising claim online?',
    options: [
      'Share it immediately',
      'Check if the headline feels exciting',
      'Cross-check it against another independent, reputable source',
      'Assume it is true if it has many likes',
    ],
    answer: 2,
  },
  {
    id: 'q10',
    question: 'Where should you install browser extensions from?',
    options: [
      'Any link found in a pop-up ad',
      'The official Chrome Web Store or Firefox Add-ons',
      'A random forum post',
      'An emailed .zip file',
    ],
    answer: 1,
  },
];

export const PASS_THRESHOLD = 70;
