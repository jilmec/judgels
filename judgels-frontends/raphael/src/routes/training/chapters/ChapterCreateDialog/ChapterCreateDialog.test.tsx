import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import { ChapterCreateDialog } from './ChapterCreateDialog';

describe('ChapterCreateDialog', () => {
  let onGetChapterConfig: jest.Mock<any>;
  let onCreateChapter: jest.Mock<any>;
  let wrapper: ReactWrapper<any, any>;

  beforeEach(() => {
    onCreateChapter = jest.fn().mockReturnValue(() => Promise.resolve({}));

    const store: any = createStore(combineReducers({ form: formReducer }), applyMiddleware(thunk));

    const props = {
      onGetChapterConfig,
      onCreateChapter,
    };
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ChapterCreateDialog {...props} />
        </MemoryRouter>
      </Provider>
    );
  });

  test('create dialog form', async () => {
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    const button = wrapper.find('button');
    button.simulate('click');

    wrapper.update();

    const name = wrapper.find('input[name="name"]');
    name.simulate('change', { target: { value: 'New Chapter' } });

    const form = wrapper.find('form');
    form.simulate('submit');

    expect(onCreateChapter).toHaveBeenCalledWith({ name: 'New Chapter' });
  });
});
