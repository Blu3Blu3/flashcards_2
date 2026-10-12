// All of these should be answerable using text, so include answers.
// Component code should check if any of the answer strings are included in the user's guess.

const poolFranchises = [
    {
        textA:      "A series of intuitive reference books on everything from programming, to homebrewing, to professional wrestling, all catered towards newcomers to the field.",
        textB:      "for dummies (1983 - present)",
        imgA:       "",
        imgB:       "img_franchise_dummies_B",
        answers:    ["dummies", "for dummies"]
    },
    {
        textA:      "A science fiction series originating with a 1965 book often touted as \"the best-selling science fiction novel in history.\"",
        textB:      "Dune (1965 - present)",
        imgA:       "",
        imgB:       "img_franchise_dune_B",
        answers:    ["dune"]
    },
    {
        textA:      "A children\'s horror series spanning 62 books as well as several TV shows and films. Despite its express avoidance of death and violence, it was often challenged for inclusion in libraries due to its occult themes and penchant for being \"too frightening\".",
        textB:      "Goosebumps (1992 - 1997)",
        imgA:       "",
        imgB:       "img_franchise_goosebumps_B",
        answers:    ["goosebumps"]
    },
    {
        textA:      "A fantasy series spanning nine novels and fifteen short stories, all revolving around the adventures of monster hunter Geralt of Rivia. Since its conception, it has been adapted into a film, two TV series, and a video game series.",
        textB:      "The Witcher (1986 - present)",
        imgA:       "",
        imgB:       "img_franchise_witcher_B",
        answers:    ["the witcher", "witcher", "the hexer", "hexer"]
    },
    {
        textA:      "Estimated to be the highest-grossing media franchise of all time, this began as a video game inspired by its creator\'s childhood love of bug collecting.",
        textB:      "Pokémon (1996 - present)",
        imgA:       "",
        imgB:       "img_franchise_pokemon_B",
        answers:    ["pokemon", "jigglypuff seen from above"]
    },
    {
        textA:      "This franchise comprises the purported best-selling video game of all time and its many, many variants, with 520 million units sold in total in 2022. The original puzzle game was developed and released in the USSR in 1985, but exploded in popularity worldwide in the years to follow.",
        textB:      "Tetris (1985 - present)",
        imgA:       "",
        imgB:       "img_franchise_tetris_B",
        answers:    ["tetris"]
    },
    {
        textA:      "A media franchise whose eponymous first video game pioneered in the programming of 3D graphics and multiplayer gameplay. (Similar respects go to Wolfenstein 3D, which this franchise's creators also developed!)",
        textB:      "DOOM (1993 - present)",
        imgA:       "",
        imgB:       "img_franchise_doom_B",
        answers:    ["doom"]
    },
    {
        textA:      "This media franchise originated with a 2009 indie game that spurred the game development scene of the 2010\'s, and still fuels the imagination of people worldwide with its infinite worlds.",
        textB:      "Minecraft (2009 - present)",
        imgA:       "",
        imgB:       "img_franchise_minecraft_B",
        // You could check fuzzy matching implementation with this answer set!
        answers:    ["minecraft", "minceraft"]
    },
    {
        textA:      "A media franchise of TV and film documentaries about the natural history of the world\'s biomes. It started with a 2001 broadcast focused on the world\'s oceans and its inhabitants, and narrated by David Attenborough.",
        textB:      "Planet Earth (2001 - present)",
        imgA:       "",
        imgB:       "img_franchise_planet_earth_B",
        answers:    ["planet earth", "blue planet", "earth"]
    },
    {
        textA:      "A TV franchise of mockumentaries about work. It originated from a British sitcom, but has versions in various countries; the American version has a notoriously painful first season.",
        textB:      "The Office (2001 - 2003 in the U.K., 2005 - 2013 in the U.S.)",
        imgA:       "",
        imgB:       "img_franchise_office_B",
        answers:    ["the office", "office"]
    },
    {
        textA:      "A science fiction TV franchise revolving around stories of ordinary people facing the supernatural and uncanny. The episodes usually feature a twist ending to hammer home a moral.",
        textB:      "The Twilight Zone (1959 - 1964)",
        imgA:       "",
        imgB:       "img_franchise_twilight_B",
        answers:    ["the twilight zone", "twilight zone"]
    },
    {
        textA:      "A long-running legal drama franchise about the New York criminal-justice system. It is renowned for its compelling stories and their gripping audio stings.",
        textB:      "Law & Order (1990 - present)",
        imgA:       "",
        imgB:       "img_franchise_law_B",
        answers:    ["law & order", "law and order", "law", "order", "dundun"]
    }
]

// No images
const poolRiddles = [
    {
        textA:      "What place do you leave without entering?",
        textB:      "The hospital where you were born / The womb",
        imgA:       "",
        imgB:       "",
        answers:    ["hospital", "womb"]
    },
    {
        textA:      "What place do you enter without leaving?",
        textB:      "The tomb",
        imgA:       "",
        imgB:       "",
        answers:    ["tomb", "grave", "death"]
    },
    {
        textA:      "\"I weigh next to nothing, but not even the strongest people can hold me for more than several minutes.\"\nWhat am I?",
        textB:      "Breath",
        imgA:       "",
        imgB:       "",
        answers:    ["breath", "air"]
    },
    {
        textA:      "What runs, but never walks? Murmurs, but never talks? Has a bed, but never sleeps? And has a mouth, but never eats?",
        textB:      "A river",
        imgA:       "",
        imgB:       "",
        answers:    ["river", "brook", "creek"]
    },
    {
        textA:      "Where can you finish a book without finishing a sentence?",
        textB:      "Prison",
        imgA:       "",
        imgB:       "",
        answers:    ["prison", "cell", "jail"]
    },
    {
        textA:      "\"I have four wings, but cannot fly / I never laugh, and never cry / On the same spot I\'m always found / Toiling away with little sound\"\nWhat am I?",
        textB:      "A windmill",
        imgA:       "",
        imgB:       "",
        answers:    ["windmill", "turbine"]
    },
    {
        textA:      "\"Often held but never touched / Always wet but never rusts / Often bites, but seldom bit / To use me well, you must have wit\"\nWhat am I?",
        textB:      "Your tongue",
        imgA:       "",
        imgB:       "",
        answers:    ["tongue"]
    },
    {
        textA:      "\"I have no wings, but I fly / I have no teeth, but I bite\"What am I?",
        textB:      "An arrow / A bullet",
        imgA:       "",
        imgB:       "",
        answers:    ["arrow", "bullet"]
    },
    {
        textA:      "\"I wear every face but cannot be seen, and when I leave, the world weeps.\" What am I?",
        textB:      "Time / Hope",
        imgA:       "",
        imgB:       "",
        answers:    ["time", "hope"]
    }
]

export class CardSet {
    // NOTE: JavaScript doesn't have function overloading, so you'll need to just add default values or other workarounds.  
    constructor(name = "blank", title = "Blank card set", desc = "Description goes here", pool = []) {
        this.name = name
        this.title = title
        this.desc = desc
        this.pool = pool
    }
}

export const cardsets = [
    new CardSet(
        "Franchises",
        "Can you name these media franchises?",
        "We\'ll give you some hints, just type your answer below!",
        poolFranchises
    ),
    new CardSet(
        "Riddles",
        "A few riddles",
        "Welcome. Care to indulge in some riddles I\'ve come across? You may enter your answers below.",
        poolRiddles
    )
]