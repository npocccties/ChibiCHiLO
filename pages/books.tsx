import { User, Book } from "@prisma/client";
import { useRouter } from "$components/router";
import { useSession } from "$utils/session";
import { useUserBooks } from "$utils/userBooks";
import Books from "$templates/Books";

function UserBooks(
  props: Omit<Parameters<typeof Books>[0], "books"> & { userId: User["id"] }
) {
  const userBooks = useUserBooks(props.userId);
  const books = userBooks.data?.books ?? [];
  return <Books {...props} books={books} />;
}

function Index() {
  const router = useRouter();
  const session = useSession();
  const userId = session.data?.user?.id;
  const handleBookClick = (pathname: `/book${"" | "/edit"}`) => (
    query: Pick<Book, "id">
  ) => router.push({ pathname, query });
  const handlers = {
    onBookClick: handleBookClick("/book"),
    onBookEditClick: handleBookClick("/book/edit"),
    onBookNewClick() {
      router.push("/book/new");
    },
  };

  if (userId == null) {
    return <Books books={[]} {...handlers} />;
  }

  return <UserBooks userId={userId} {...handlers} />;
}

export default Index;
