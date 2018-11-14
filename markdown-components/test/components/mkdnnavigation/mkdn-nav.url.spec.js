import Url       from '../../../src/components/mkdn-nav.url';
import {Index}   from '../../../src/shared';
import {Section} from '../../../src/shared/section';
import {Story}   from '../../../src/shared/story';

const mockLocationAppRoot = {location: {}};
const mockLocationdeepDocument = {location: {}};
const mockRegister = {dispatch: function() {}};
const mockHistory = {pushState: function() {}};
const mockDocument = {title: ''};
let index;

describe('The Url class', () => {
  beforeEach(() => {
    mockLocationAppRoot.location.origin = 'http://domain.com:8080';
    mockLocationAppRoot.location.pathname = '/home';
    mockLocationAppRoot.location.hash = undefined;

    mockLocationdeepDocument.location.origin = 'http://domain.com:8080';
    mockLocationdeepDocument.location.pathname = '/home';
    mockLocationdeepDocument.location.hash = '#section-1/subsection-2/doc-2';

    index = new Index([
                        new Section('Section 1', 'section-1'),
                        new Section('Sub-Section 2', 'subsection-2'),
                      ],
                      [
                        new Story('doc-1', 'Document 1'),
                        new Story('doc-2', 'Document 2'),
                      ],
                      'doc-1');
  });

  function create(window = mockLocationAppRoot) {
    return new Url('The Home', mockRegister, window, mockHistory, mockDocument);
  }

  test('initializes without hash and no index', () => {
    const url = create();
    expect(url.getCrumbs().length).toBe(0);
  });

  test('initializes without only a home', () => {
    const url = create();
    url.updateHome('http://foo.com', 'home');
    expect(url.getCrumbs().length).toBe(1);
  });

  test('doesn\'t open document in hash', () => {
    const url = create(mockLocationdeepDocument);
    url.updateHome('http://foo.com', 'The Home');
    const mockEvent = {detail: index};

    url.updateWithIndex(mockEvent);
    expect(url.getCrumbs().length).toBe(3);
    expect(url.getCrumbs()[0].title).toBe('The Home');
    expect(url.getCrumbs()[1].title).toBe('Section 1');
    expect(url.getCrumbs()[2].title).toBe('Sub-Section 2');
  });

  test('opens default document', () => {
    const url = create();
    url.updateHome('http://foo.com', 'home');
    const mockEvent = {detail: index};
    url.updateWithIndex(mockEvent);
    expect(url.getCrumbs().length).toBe(4);
    expect(url.getCrumbs()[3].title).toBe('Document 1');
  });

  test('crumbs get cloned', () => {
    // this test is not that great
    const url = create();
    const crumbs = url.getCrumbs();
    const event = {newURL: 'http://domain.com:8080/home/#section-1/subsection-2/doc-3'};
    url.updateWithHash(event);
    const updatedCrumbs = url.getCrumbs();

    expect(updatedCrumbs).not.toBe(crumbs);
  });
});
