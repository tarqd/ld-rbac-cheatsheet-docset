require('fs').writeFileSync('lol.json', JSON.stringify(grouped.map(nodes => { var path = nodes.find(x => x.type == 'code');var paragraph = nodes.find(x => x.type == 'paragraph');  return { name: nodes.find(x => 'heading' == x.type).children[0].value.replace(' actions', ''), path: path && path.value || 'acct', desc: (paragraph && paragraph.children.map(x => {if (x && x.type == 'inlineCode') {return `<code>${x.value}</code>`;} else return x.value || `<${x.type}>${x.children.map(x => x.value)}</${x.type}>` }).join('').replace('A code sample is below:', '').trim() ), actions: (nodes.find(x => x.type == 'jsx' && x.value.includes('TableCell')).value.match(/<TableRow>.+?<\/TableRow>/gsm).map(row => row.matchAll(/<TableCell>(.+?)<\/TableCell>/gsm)).map(x => Array.from(x).map(x => x[1].trim())).map(([key, value]) => { return {[key.replace('<code>', '').replace('</code>', '')] : value } })) }}), null, 2))