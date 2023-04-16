import { InferGetStaticPropsType } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Container from 'components/Container';
import { allPosts } from 'contentlayer/generated';

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const MDXComponent = useMDXComponent(post!.body.code);

	const customMeta = {
		title: post?.title,
		description: post?.description,
		date: new Date(post!.date).toISOString(),
	};

	return (
		<Container customMeta={customMeta}>
			<div className={`mt-10 prose`}>
				<h1 className={`my-3`}>{post?.title}</h1>
				<h2 className={`font-medium text-gray-500 text-lg my-3`}>{post?.description}</h2>
				<p className={`font-light text-s text-gray-400`}>{post?.date}</p>
				<MDXComponent />
			</div>
		</Container>
	);
};

export const getStaticPaths = async () => {
	return {
		paths: allPosts.map((p) => ({ params: { slug: p._raw.flattenedPath } })),
		fallback: false,
	};
};

export const getStaticProps = async ({ params }: any) => {
	const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);
	return {
		props: {
			post,
		},
	};
};

export default Post;