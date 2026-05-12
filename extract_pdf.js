const fs = require('fs');
const pdfParse = require('pdf-parse');

async function extract() {
  const files = [
    'C:/Users/Hayhonourise/Downloads/Dealrite coastal FAQs.pdf',
    'C:/Users/Hayhonourise/Downloads/Dealrite OwnFarm FAQs.pdf.pdf'
  ];

  for (const file of files) {
    if (fs.existsSync(file)) {
      console.log(`\n--- EXTRACING ${file} ---\n`);
      let dataBuffer = fs.readFileSync(file);
      try {
        let parseFn = pdfParse.default || pdfParse;
        let data = await parseFn(dataBuffer);
        console.log(data.text);
      } catch (err) {
        console.error('Error parsing:', err);
      }
    } else {
      console.log(`\n--- FILE NOT FOUND: ${file} ---\n`);
    }
  }
}

extract();
