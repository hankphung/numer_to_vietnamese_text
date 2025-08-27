/**
 * Convert a number to its Vietnamese string representation.
 * By Dong Hung Phung <donghung.viethanit@gmail.com>
 */
(function () {
    const DIGIT_WORDS   = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const TEN_WORDS     = ['lẻ', 'mười', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const HUNDRED_WORDS = DIGIT_WORDS;

    /**
     * Generate the correct Vietnamese scale unit for any 3-digit group index.
     *  0 → '', 1 → 'nghìn', 2 → 'triệu', 3 → 'tỷ',
     *  4 → 'nghìn tỷ', 5 → 'triệu tỷ', 6 → 'tỷ tỷ', etc.
     */
    function getScaleUnit(idx) {
      const base = ['', 'nghìn', 'triệu', 'tỷ'];
      if (idx < 4) return base[idx];
      const pos = idx - 3;
      if (pos < 4) return `${base[pos]} tỷ`;
      // for very large numbers, repeat 'tỷ'
      const repeatCount = Math.floor(pos / 4) + 1;
      const unit = base[pos % 4] || '';
      return [unit, 'tỷ'.repeat(repeatCount)].filter(Boolean).join(' ');
    }

    function convertTens(twoDigits) {
        const [tens, units] = twoDigits.split('').map(Number);
        const parts = [TEN_WORDS[tens]];

        let unitWord = DIGIT_WORDS[units];
        if (tens > 0 && units === 5) unitWord = 'lăm';
        if (tens > 1) {
            parts.push('mươi');
            if (units === 1) unitWord = 'mốt';
        }
        if (units !== 0) parts.push(unitWord);

        return parts.join(' ');
    }

    function convertThreeDigits(block) {
        if (block.length === 1) return DIGIT_WORDS[Number(block)];
        if (block.length === 2) return convertTens(block);

        // block.length === 3
        const [h, , ] = block.split('').map(Number);
        const rest = block.slice(1);
        const parts = [HUNDRED_WORDS[h], 'trăm'];

        if (rest !== '00') parts.push(convertTens(rest));
        return parts.join(' ');
    }

    function toVietnamese(input, currency) {
        const num = parseInt(input, 10);
        if (isNaN(num)) return '';

        const str = num.toString();
        const blocks = [];
        for (let i = str.length; i > 0; i -= 3) {
            blocks.unshift(str.slice(Math.max(0, i - 3), i));
        }

        const words = blocks.map((blk, idx) => {
            if (blk === '000') return null;
            const scaleIdx = blocks.length - 1 - idx;
            return [ convertThreeDigits(blk), getScaleUnit(scaleIdx) ]
                     .filter(Boolean).join(' ');
        }).filter(Boolean);

        if (currency) words.push(currency);
        return words.join(' ').replace(/\s+/g, ' ').trim();
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = toVietnamese;
    } else {
        window.toVietnamese = toVietnamese;
    }

    return toVietnamese;
})();
