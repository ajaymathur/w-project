import Conf from 'conf';

interface Set {
  conf: Conf,
  property: string,
  value: string
}

export default function setConfig({
  conf,
  property,
  value
}: Set) {
  try {
    switch (property) {
      case 'editor':
        if (['code', 'atom', 'vim', 'vi'].indexOf(value) === -1)
          throw new Error(`Unknow editor ${value}`);
        break;
      default:
        throw new Error(`Unknown property ${property}`);
    }
    conf.set(property, value)
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
}
