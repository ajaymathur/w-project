import Conf from 'conf';
import { UnknownEditorError, UnsupportedPropertyError } from '../functions/errors';
import { unknown_editor, unknown_property } from '../functions/messages';

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
  const supportedEditors = ['code', 'atom', 'vim', 'vi'];
  switch (property) {
    case 'editor':
      if (supportedEditors.indexOf(value) === -1)
        throw new UnknownEditorError(unknown_editor(value, supportedEditors.join(', ')));
      break;
    default:
      throw new UnsupportedPropertyError(unknown_property(property));
  }
  conf.set(property, value)
}
