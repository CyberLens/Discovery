// contains the attribute/connection patterns and the suggestions.js

const constraintsList = {
  s0: {
    concept: 'device',
    attribute: 'layer',
    attributeValue: 'perception',
    suggestion: 'Devices in the perception layer require physical security.',
    nodes: []
  },
  s1: {
    concept: 'device',
    attribute: 'layer',
    attributeValue: 'gateway',
    suggestion:
      'Devices in the gateway layer are usually external facing nodes. Malicious actors can target them with network attacks.',
    nodes: []
  },
  s2: {
    concept: 'device',
    attribute: 'layer',
    attributeValue: 'application',
    suggestion:
      'Devices in the application layer are usually provided by third parties. The security configuration of third party devices must be taken into consideration since it affects the security posture of the overall system.',
    nodes: []
  },
  s3: {
    concept: 'device',
    attribute: 'update',
    attributeValue: 'false',
    suggestion: 'Treat devices that cannot be updated as compromised.',
    nodes: []
  },
  s4: {
    concept: 'connection',
    attribute: 'medium',
    attributeValue: 'wireless',
    suggestion:
      'Wireless connections are subject to information disclosure attacks. Use encrypted protocols.',
    nodes: []
  },
  s5: {
    concept: 'application',
    attribute: 'update',
    attributeValue: 'false',
    suggestion: 'Treat applications that cannot be updated as compromised.',
    nodes: []
  },
  s6: {
    concept: 'device',
    attribute: 'update',
    attributeValue: 'action',
    suggestion: 'Define a policy to update Devices that require user action.',
    nodes: []
  },
  s7: {
    concept: 'application',
    attribute: 'update',
    attributeValue: 'action',
    suggestion: 'Define a policy to update Applications that require user action.',
    nodes: []
  }
}

module.exports = constraintsList
