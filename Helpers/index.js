const parseSteemMarkdown = require('steem-markdown-only')

function parserSteemSimpleRep(rep)
// Convert a UI-ready rep score back into its approx raw value."""
{
    rep = parseFloat(rep+0.01) - 25;
    rep = rep / 9;
    rep = rep + 9;
    const sign = (rep >= 0 ? 1  : -1);
    return parseInt(sign * Math.pow(10, rep))
}


parserSteemRep(reputation) {
      function log10(str) {
        const leadingDigits = parseInt(str.substring(0, 4));
        const log = Math.log(leadingDigits) / Math.LN10 + 0.00000001;
        const n = str.length - 1;
        return n + (log - parseInt(log));
      }
      if (reputation == null) return reputation;
      let rep = String(reputation);
      const neg = rep.charAt(0) === "-";
      rep = neg ? rep.substring(1) : rep;

      let out = log10(rep);
      if (isNaN(out)) out = 0;
      out = Math.max(out - 9, 0); // @ -9, $0.50 earned is approx magnitude 1
      out = (neg ? -1 : 1) * out;
      out = out * 9 + 25; // 9 points per magnitude. center at 25
      // base-line 0 to darken and < 0 to auto hide (grep rephide)
      out = parseInt(out);
      //console.log("reppp:", out);
      reputation = out;
      return out;
    }

export  {parseSteemMarkdown, parserSteemRep, parserSteemSimpleRep}