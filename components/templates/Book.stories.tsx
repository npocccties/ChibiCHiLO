export default { title: "templates/Book" };

import { useNextItemIndexAtom } from "$store/book";
import Book from "./Book";
import { book } from "samples";

const props = {
  book,
  onBookEditClick: console.log,
  onTopicEditClick: console.log,
};

// TODO: Please use <Provider> の問題の回避。なぜか回避できる。
function wrap(WrappedComponent: React.FC) {
  function Component() {
    return <WrappedComponent />;
  }
  return Component;
}

export const Default = wrap(() => {
  const [index, nextItemIndex] = useNextItemIndexAtom();
  const handleTopicEnded = () => nextItemIndex();
  const handleItemClick = nextItemIndex;

  return (
    <Book
      {...props}
      index={index}
      onTopicEnded={handleTopicEnded}
      onItemClick={handleItemClick}
    />
  );
});

export const Empty = wrap(() => {
  const [index, nextItemIndex] = useNextItemIndexAtom();
  const handleTopicEnded = () => nextItemIndex();
  const handleItemClick = nextItemIndex;

  return (
    <Book
      book={null}
      index={index}
      onBookEditClick={props.onBookEditClick}
      onTopicEnded={handleTopicEnded}
      onItemClick={handleItemClick}
    />
  );
});

export const EmptySection = wrap(() => {
  const [index, nextItemIndex] = useNextItemIndexAtom();
  const handleTopicEnded = () => nextItemIndex();
  const handleItemClick = nextItemIndex;

  return (
    <Book
      book={{ ...props.book, sections: [] }}
      index={index}
      onBookEditClick={props.onBookEditClick}
      onTopicEnded={handleTopicEnded}
      onItemClick={handleItemClick}
    />
  );
});
