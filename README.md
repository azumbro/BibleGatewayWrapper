# Bible Gateway Wapper

 A simple Node module for interacting with the content on [Bible Gateway](https://www.biblegateway.com/).

## Usage
1) Get the BibleGatewayWrapper module by running ```npm install BibleGatewayWrapper```. 
getBibleChapter2) Made the wrapper callable from your code by importing it using `import { getBibleChapter } from "BibleGatewayWrapper"` or `const bibleGatewayWrapper = require("BibleGatewayWrapper")`.
3) Call the wrapper using 

    ```
    const result = getBibleChapter(book, chapter, version, format, includeFootnotes)
    ``` 

    or 

    ```
    const result = bibleGatewayWrapper.getBibleChapter(book, chapter, version, format, includeFootnotes)
    ``` 

    with the arguments described below.
    - `book`: The book of the Bible for which to fetch content. See options under "Bible Book List" at [biblegateway.com/](https://www.biblegateway.com/).
    - `chapter`: The chapter from the specified book of the Bible for which to fetch content. See options under "Bible Book List" at [biblegateway.com/](https://www.biblegateway.com/).
    - `version`: The Bible version for which to fetch content. See options in dropdown at [biblegateway.com/](https://www.biblegateway.com/).
    - `format` (optional, defaults to `html`): The format in which to return content. Options are `html` (returns the content as an HTML string), `html-array` (returns the content as an array of HTML strings split by verse), `text` (returns the content as a plaintext string), or `text-array` (returns the content as an array of plaintext strings split by verse).
    - `includeFootnotes` (optional, defaults to `false`): Boolean value specifying whether or not to include footnotes in the returned content.
     
     
## Example
Code:
```
import { getBibleChapter } from "BibleGatewayWrapper"

(async () => {
    const output = await getBibleChapter("Psalms", 117, "RSVCE", "html-array")
    console.log(output)
})().catch((e) => console.log(e))
```

Output:
```
[
  'Universal Call to Worship',
  '<span class="chapternum">117 </span>Praise the <span style="font-variant: small-caps" class="small-caps">Lord</span>, all nations!',
  'Extol him, all peoples!',
  '<sup class="versenum">2 </sup>For great is his steadfast love toward us;',
  'and the faithfulness of the <span style="font-variant: small-caps" class="small-caps">Lord</span> endures for ever.',
  'Praise the <span style="font-variant: small-caps" class="small-caps">Lord</span>!'
]
```