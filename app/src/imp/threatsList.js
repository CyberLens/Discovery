// contains the attribute/connection patterns and the threats.js
// Temporary dict with test values

const threatsList = {
  t0: {
    concept: 'device',
    attribute: 'layer',
    attributeValue: 'perception',
    suggestion: 'Devices in the perception layer require physical security.',
    nodes: []
  },
  t1: {
    concept: 'device',
    attribute: 'layer',
    attributeValue: 'gateway',
    suggestion:
      'Devices in the gateway layer are usually external facing nodes. Malicious actors can target them with network attacks.',
    nodes: []
  }
}

module.exports = threatsList
