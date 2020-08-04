module.exports = {
  parameterize: string => {
    string = string.replace(/^\s+|\s+$/g, ''); // trim
    string = string.toLowerCase();

    // remove accents, swap ñ for n, etc
    let from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
    let to = 'aaaaaeeeeeiiiiooooouuuunc------';
    for (let i = 0, l = from.length; i < l; i++) {
      string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    string = string
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return string;
  },

  alphabet: () => {
    let list = [];

    for (let i = 0; i < 26; i++) {
      list.push((i + 10).toString(36));
    }

    return list;
  },

  groupObjectsByNameLetter: items => {
    let grouped = {};

    items.map(item => {
      let firstLetter = item.name.charAt(0);

      if (typeof grouped[firstLetter] === 'undefined') {
        grouped[firstLetter] = [];
      }

      return grouped[firstLetter].push(item);
    });

    // create a new object sorted alphabetically
    let sorted = {};

    Object.keys(grouped)
      .sort()
      .forEach(letter => {
        sorted[letter] = grouped[letter];
      });

    return sorted;
  },
};
