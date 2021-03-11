const { readFileSync } = require("fs-extra");
const { blue, dim, red, bold, underline } = require("chalk");
const { join } = require("path");

const FEATURES = {
	HAIR: {
		RED_HAIR: 0.04,
		BLACK_HAIR: 0.32,
		BLONDE_HAIR: 0.32,
		BROWN_HAIR: 0.32
	},
	SHIRT: {
		A_RED_SHIRT: 0.2,
		A_BLUE_SHIRT: 0.2,
		A_GREEN_SHIRT: 0.2,
		A_YELLOW_SHIRT: 0.2,
		A_BLACK_SHIRT: 0.2
	},
	PANTS: {
		JEANS: 0.33,
		SWEAT_PANTS: 0.33,
		KHAKI_PANTS: 0.33,
		HAWAIIAN_SHORTS: 0.01
	},
	ITEM_A: {
		A_BRIEFCASE: 0.25,
		A_PURSE: 0.25,
		A_DOG_CARRIER: 0.25,
		A_HAT: 0.25
	},
	ITEM_B: {
		A_CLIPBOARD: 0.33,
		A_PASSPORT: 0.33,
		A_CAT_CARRIER: 0.33,
		A_LARGE_RHINOCEROS: 0.01
	}
};

const characters = [
	// Grandma
	{
		ascii: readFileSync(join(__dirname, "../ascii/grandma.txt"), "utf-8"),
		names: ["Grandma"],
		properties: { item: ["watch", "necklace", "hearing aids"] },
		dialog: {
			victim: [
				[
					"*whimper* *whimper*",
					"Somebody stole my... my... *cries*",
					`oh... I guess I should tell you... ${blue(
						"Someone has stolen my $$ITEM!"
					)}`,
					"*whimper* *whimp- What? You'll find it? Thank you! *hugs you*"
				],
				[
					"Oh, hello sonny. You were the one who was going to find my $$ITEM, weren't you?",
					"Well, have you found it?"
				]
			],
			victimSuccess: ["Oh thank you! Thank you so much! *hugs you*"],
			default: [
				[
					"Who? Sorry, let me put my ears in...",
					"...",
					"What did you ask again?",
					"If I've seen anyone suspicious? Who are you, a detective?",
					`Oh, I see... yes... let's see... You know, ${blue(
						"I saw someone with $$CLUE yesterday"
					)}.`,
					dim("Now, Back to the problem of those propeller hats...")
				],
				[
					`Hello, sonny. Back for my ${blue(
						"clue"
					)}, huh? I saw someone with $$CLUE yesterday.`
				]
			]
		}
	},
	// Man
	{
		ascii: readFileSync(join(__dirname, "../ascii/man.txt"), "utf-8"),
		names: [
			"John",
			"Fred",
			"George",
			"Greg",
			"Mr.",
			"Michael",
			"Carl",
			"Montè",
			"Nathaniel",
			"Joe",
			"Bill"
		],
		properties: {
			job: [
				"a business man",
				"a farmer",
				"the CEO of Micosoft",
				"a game developer at Mohang"
			],
			hacked: ["bank account", "credit card", "computer", "micro-VR headset"]
		},
		dialog: {
			victim: [
				[
					"Oh dear, oh dear, oh dear... THIS IS NOT GO-",
					"What? Oh, it's nothing...",
					"Fine.",
					"At my job as $$JOB, I need my $$HACKED. But... SOMEONE HACKED IT!!! ITS A TRAGEDY!!",
					"WHO WILL BUY ME MORE STUFF I DON'T NEED IF I CAN'T MAKE MONEY??? *breaks into tears*"
				],
				[
					"WHO WILL BUY ME MORE STUFF I DON'T NEED IF I CAN'T MAKE MONEY??? *breaks into tears*"
				]
			],
			victimSuccess: [
				"Oh good! Now $$CULPRIT can tell me how to fix my $$HACKED!!",
				"WHAT!?!? I HAVE TO GET A NEW ONE?!?! THIS IS TERRIBLE!!!",
				"..."
			],
			default: [
				[
					"You want to know about someone suspicious? I was too busy working as $$JOB.",
					"...",
					`Although... I did see someone with ${blue("$$CLUE")}...`
				],
				[
					"hello... *does whatever $$JOB does*",
					"...",
					"Oh, you!",
					`You want to know ${blue(
						"what I said"
					)}? I said that I saw someone with $$CLUE. Now, leave me alone.`,
					"*keeps doing whatever $$JOB does*"
				]
			]
		}
	},
	// Woman
	{
		ascii: readFileSync(join(__dirname, "../ascii/woman.txt"), "utf-8"),
		names: [
			"Tessa",
			"Georgina",
			"Hadley",
			"Kamala",
			"Hillary",
			"Jean",
			"Briony",
			"Britney"
		],
		properties: {
			lost: ["car keys", "purse", "credit card", "large rhinoceros"]
		},
		dialog: {
			victim: [
				[
					"Oh dear, oh dear, oh dear...",
					"What? Oh, it's nothing...",
					"I lost my $$LOST!! I don't know where to find it!",
					"Oh, how will anyone ever forgive me?? *breaks into tears*"
				],
				["Oh, how will anyone ever forgive me?? *breaks into tears*"]
			],
			victimSuccess: [
				"Oh, thank you!!!",
				"...",
				"Someone stole it? Well, that's a surprise."
			],
			default: [
				[
					"You want to know about someone suspicious?",
					"...",
					`Yesterday? I saw someone with ${blue("$$CLUE")}.`,
					"I hope I could help you. Bye!"
				],
				[
					`Oh hello! You want my ${blue(
						"clue"
					)}? Well, I saw someone with $$CLUE.`
				]
			]
		}
	},

	// Girl
	{
		ascii: readFileSync(join(__dirname, "../ascii/girl.txt"), "utf-8"),
		names: [
			"Jill",
			"Jen",
			"Tessa",
			"Georgina",
			"Hadley",
			"Kamala",
			"Hillary",
			"Jean",
			"Briony",
			"Britney",
			"Large Rhinoceros"
		],
		properties: {
			game: ["ball", "jump-rope", "four square", "pretend", "stuffies"],
			lost: ["ball", "jump-rope", "mother's credit card", "chest of diamonds"]
		},
		dialog: {
			victim: [
				[
					"*crying*",
					"What? Oh, it's nothing...",
					"I lost my $$LOST!! I don't know where to find it!",
					"Oh, where can my $$LOST be? *goes back to crying*"
				],
				[
					"*crying*",
					`What? You want to know if I saw someone? Hmm... Now that you say that, I think that I saw someone with ${blue(
						"$$CLUE"
					)}.`
				]
			],
			victimSuccess: [
				"Oh, thank you!!!",
				"...",
				"Someone stole it? Well, that's a surprise."
			],
			default: [
				[
					"*playing $$GAME*",
					"Oh, hello person! I didn't see you there. Do you want to play $$GAME?",
					`Someone suspicious? Yesterday? Are you a detective? Can I help? I'm ${bold(
						"really"
					)} good at detective!`,
					"No? Aww man...",
					`Oh, sure! I saw someone with ${blue("$$CLUE")}. ${dim(
						"I think..."
					)}`,
					"Bye Mr. Detective!! Next, time I wanna help!"
				],
				[
					`Oh hello Mr. Detective! You want my ${blue(
						"clue"
					)} again? It's a clue?!? Oh, wow!`,
					"Oh, right the clue. Well, I saw someone with $$CLUE."
				]
			]
		}
	},

	// Boy
	{
		ascii: readFileSync(join(__dirname, "../ascii/boy.txt"), "utf-8"),
		names: [
			"John",
			"Fred",
			"George",
			"Greg",
			"Michael",
			"Carl",
			"Montè",
			"Nathaniel",
			"Joe",
			"Bill"
		],
		properties: {
			game: ["ball", "jump-rope", "four square", "pretend", "stuffies"],
			lost: [
				"ball",
				"jump-rope",
				`father's Ninbendo Glitch, the best game console ${underline("ever")}`,
				"chest of diamonds"
			]
		},
		dialog: {
			victim: [
				[
					"*crying*",
					"What? Oh, it's nothing...",
					"I lost my $$LOST!! I don't know where to find it!",
					"Oh, where can my $$LOST be? *goes back to crying*"
				],
				[
					"*crying*",
					`What? You want to know if I saw someone? Hmm... Now that you say that, I think that I saw someone with ${blue(
						"$$CLUE"
					)}`
				]
			],
			victimSuccess: [
				"Oh, thank you!!! I don't know what I'd do with out my $$LOST.",
				"...",
				"Someone stole it? Well, that's a surprise.",
				"...",
				"Can I interview you?"
			],
			default: [
				[
					"*playing $$GAME*",
					"Oh, hello person! I didn't see you there. Do you want to play $$GAME?",
					`Someone suspicious? Yesterday? Are you a detective? Oh man, oh man, this is great! Can I interview you for my school?`,
					`Oh, sure! I saw someone with ${blue("$$CLUE")}.`,
					"Bye sir! Come back soon!"
				],
				[
					"Oh, hello again sir! Can interview you now?",
					`Still on the case, huh. Oh well, as I said, I saw someone with ${blue(
						"$$CLUE"
					)}.`
				]
			]
		}
	}
];

const lastNames = [
	"Leggett",
	"Harris",
	"Biden",
	"Mark",
	"Garcia",
	"Miller",
	"Davis",
	"Rodriguez",
	"Martinez",
	"Hernandez",
	"Lopez",
	"Gonzalez",
	"Wilson",
	"Anderson",
	"Thomas",
	"Taylor",
	"Jackson",
	"Martin",
	"Lee",
	"Thompson",
	"White",
	"Harris",
	"Sanchez",
	"Ramirez",
	"Robinson",
	"Walker",
	"Young",
	"King",
	"Wright",
	"Scott",
	"Torres",
	"Nguyen",
	"Hill",
	"Roberts"
];

module.exports = function (code = null) {
	function constructCharacter(role, culprit = null, name = null, sType = null) {
		let type =
			sType == null
				? characters[Math.floor(Math.random() * characters.length)]
				: characters[sType];
		let features = {};
		let properties = {};

		for (const feature in FEATURES) {
			if (Object.hasOwnProperty.call(FEATURES, feature)) {
				const options = FEATURES[feature];
				const number = Math.random();
				let i = 0;
				let selected;

				for (const option in options) {
					if (Object.hasOwnProperty.call(options, option)) {
						const odds = options[option];
						if (number > i && number < i + odds) {
							selected = option.toLowerCase().replace(/_/g, " ");
							break;
						}

						i += odds;
					}
				}

				features[
					feature.toLowerCase().replace(/_([a-z])/, (_w, c) => c.toUpperCase())
				] = selected;
			}
		}

		for (const property in type.properties) {
			if (Object.hasOwnProperty.call(type.properties, property)) {
				const options = type.properties[property];
				properties[property] =
					options[Math.floor(Math.random() * options.length)];
			}
		}

		const featureList = Object.keys(FEATURES);
		const clue = culprit
			? culprit.features[
					featureList[Math.floor(Math.random() * featureList.length)]
						.toLowerCase()
						.replace(/_([a-z])/, (_w, c) => c.toUpperCase())
			  ]
			: null;

		return {
			ascii: type.ascii,
			dialog: type.dialog,
			conversation: 0,
			features,
			properties,
			name:
				name == null
					? `${type.names[Math.floor(Math.random() * type.names.length)]} ${
							lastNames[Math.floor(Math.random() * lastNames.length)]
					  }`
					: name,
			role,
			clue
		};
	}

	let characterList;

	if (code === null) {
		let culprit = constructCharacter("culprit", constructCharacter());
		let victim = constructCharacter("victim", culprit);

		characterList = [
			...Array(8)
				.fill("")
				.map(() => constructCharacter("default", culprit)),
			culprit,
			victim
		].sort(() => Math.random() - Math.random());
	} else if (code === "leschi") {
		const names = [
			"Owen Leggett",
			"Reed Leggett",
			"Tessa Leggett",
			"Hadley Leggett",
			"Micheal Leggett",
			"Carl Myers",
			"Jean Myers",
			"Grayson Myers",
			"Adrienne Wylie",
			"Nathaniel Myers",
			"Sebastian Myers"
		];

		const types = [4, 4, 3, 2, 1, 1, 0, 1, 2, 4, 4];

		let ci = Math.floor(Math.random() * names.length);
		let culprit = constructCharacter(
			"culprit",
			constructCharacter(),
			names.splice(ci, 1)[0],
			types.splice(ci, 1)[0]
		);

		let vi = Math.floor(Math.random() * names.length);
		let victim = constructCharacter(
			"victim",
			culprit,
			names.splice(vi, 1)[0],
			types.splice(vi, 1)[0]
		);

		characterList = [
			...Array(9)
				.fill("")
				.map((_, i) =>
					constructCharacter("default", culprit, names[i], types[i])
				),
			culprit,
			victim
		].sort(() => Math.random() - Math.random());
	}

	return characterList;
};
