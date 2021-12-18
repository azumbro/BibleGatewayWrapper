const axios = require("axios")
const htmlParser = require("node-html-parser")

const ERROR_PREFIX = "Bible Gateway Wrapper - "
const CONTENT_PARSERS = {
    html: (content) => `<div>${content.map((x) => `<p>${x.innerHTML}</p>`).join("")}</div>`,
    "html-array": (content) => content.map((x) => x.innerHTML),
    text: (content) => content.map((x) => x.innerText).join("\n"),
    "text-array": (content) => content.map((x) => x.innerText),
}
const ARG_VALIDATIONS = [
    { condition: (args) => stringValidation(args[0]), errorMessage: "'book' argument must be a non-empty string" },
    { condition: (args) => isNaN(args[1]), errorMessage: "'chapter' argument must be a number" },
    { condition: (args) => stringValidation(args[2]), errorMessage: "'version' argument must be a non-empty string" },
    { condition: (args) => !(args[3] in CONTENT_PARSERS), errorMessage: `'format' argument is invalid (valid formats: ${Object.keys(CONTENT_PARSERS).join(", ")})` },
]

const stringValidation = (str) => typeof str !== "string" || str.length < 1

const buildURL = (book, chapter, version) => `https://www.biblegateway.com/passage/?search=${book}+${chapter}&version=${version}`

function parseContent(content, format, includeFootnotes) {
    let elements = []
    const root = htmlParser.parse(content)
    if (includeFootnotes) {
        elements = root.querySelectorAll(".footnotes")
    } else {
        root.querySelectorAll(".footnote").forEach((x) => x.remove())
    }
    elements = [...root.querySelectorAll(".text"), ...elements]
    return CONTENT_PARSERS[format](elements)
}

function validateArgs() {
    ARG_VALIDATIONS.forEach((x) => {
        if (x.condition(arguments)) throw `${ERROR_PREFIX} Input Error: ${x.errorMessage}`
    })
}

async function getBibleChapter(book, chapter, version, format = "html", includeFootnotes = false) {
    validateArgs(book, chapter, version, format, includeFootnotes)

    const url = buildURL(book, chapter, version)
    let response
    try {
        response = await axios.get(url)
    } catch (e) {
        throw `${ERROR_PREFIX} Request Error: ${e}`
    }

    const root = htmlParser.parse(response.data)
    const content = root.querySelector(".passage-content")
    if (!content) {
        throw `${ERROR_PREFIX} Content Error: No result found for input.`
    }

    return parseContent(content, format, includeFootnotes)
}

module.exports = {
    getBibleChapter,
}
