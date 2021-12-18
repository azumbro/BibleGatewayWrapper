;(async () => {
    const wrapper = require("../index")

    let passedTestCases = 0

    const passTestCase = (testCaseName) => {
        console.log(`PASSED test case ${testCaseName}`)
        passedTestCases++
    }
    const failTestCase = (testCaseName) => {
        console.log(`FAILED test case ${testCaseName}`)
    }

    const testCases = [
        async () => {
            const testCaseName = "1) Invalid book arg"
            try {
                await wrapper.getBibleChapter(0, 1)
            } catch (e) {
                if (e.includes("'book' argument must be a non-empty string")) {
                    return passTestCase(testCaseName)
                }
            }
            return failTestCase(testCaseName)
        },
        async () => {
            const testCaseName = "2) Invalid chapter arg"
            try {
                await wrapper.getBibleChapter("foo", "foo")
            } catch (e) {
                if (e.includes("'chapter' argument must be a number")) {
                    return passTestCase(testCaseName)
                }
            }
            return failTestCase(testCaseName)
        },
        async () => {
            const testCaseName = "3) Invalid version arg"
            try {
                await wrapper.getBibleChapter("foo", 1, "")
            } catch (e) {
                if (e.includes("'version' argument must be a non-empty string")) {
                    return passTestCase(testCaseName)
                }
            }
            return failTestCase(testCaseName)
        },
        async () => {
            const testCaseName = "4) Invalid format arg"
            try {
                await wrapper.getBibleChapter("foo", 1, "RSVCE", "foo")
            } catch (e) {
                if (e.includes("'format' argument is invalid")) {
                    return passTestCase(testCaseName)
                }
            }
            return failTestCase(testCaseName)
        },
        async () => {
            const testCaseName = "5) Content error"
            try {
                await wrapper.getBibleChapter("foo", 1, "RSVCE", "html")
            } catch (e) {
                if (e.includes("Content Error")) {
                    return passTestCase(testCaseName)
                }
            }
            return failTestCase(testCaseName)
        },
        async () => {
            const testCaseName = "6) HTML pass"
            try {
                const output = await wrapper.getBibleChapter("Genesis", 1, "RSVCE", "html")
                if (output.includes("Six Days of Creation and the Sabbath") && output.includes("<div>")) {
                    return passTestCase(testCaseName)
                }
            } catch (e) {}
            return failTestCase(testCaseName)
        },
        async () => {
            const testCaseName = "6) HTML array pass"
            try {
                const output = await wrapper.getBibleChapter("Genesis", 1, "RSVCE", "html-array")
                if (output[0].includes("Six Days of Creation and the Sabbath") && output[1].includes("<span") && output.length === 32) {
                    return passTestCase(testCaseName)
                }
            } catch (e) {}
            return failTestCase(testCaseName)
        },
        async () => {
            const testCaseName = "7) Text pass"
            try {
                const output = await wrapper.getBibleChapter("Genesis", 1, "RSVCE", "text")
                if (output.includes("Six Days of Creation and the Sabbath") && !output.includes("<div>")) {
                    return passTestCase(testCaseName)
                }
            } catch (e) {}
            return failTestCase(testCaseName)
        },
        async () => {
            const testCaseName = "8) Text array pass"
            try {
                const output = await wrapper.getBibleChapter("Genesis", 1, "RSVCE", "text-array")
                if (output[0].includes("Six Days of Creation and the Sabbath") && !output[1].includes("<span") && output.length === 32) {
                    return passTestCase(testCaseName)
                }
            } catch (e) {}
            return failTestCase(testCaseName)
        },
        async () => {
            const testCaseName = "6) HTML pass with footnotes"
            try {
                const output = await wrapper.getBibleChapter("Genesis", 1, "RSVCE", "html", true)
                if (output.includes("Six Days of Creation and the Sabbath") && output.includes("<div>")) {
                    return passTestCase(testCaseName)
                }
            } catch (e) {}
            return failTestCase(testCaseName)
        },
    ]

    const testCasePromises = testCases.map((x) => x())
    Promise.all(testCasePromises).then(() => {
        console.log(`\nPassed ${passedTestCases}/${testCases.length} test cases`)
    })
})().catch((e) => console.log(e))
