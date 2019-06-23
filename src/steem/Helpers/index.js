const parseSteemMarkdown = require('steem-markdown-only')

function parserSteemRep(rep)
// Convert a UI-ready rep score back into its approx raw value."""
{
    rep = parseFloat(rep+0.01) - 25;
    rep = rep / 9;
    rep = rep + 9;
    const sign = (rep >= 0 ? 1  : -1);
    return parseInt(sign * Math.pow(10, rep))
}

export {parseSteemMarkdown, parserSteemRep}