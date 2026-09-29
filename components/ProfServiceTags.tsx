interface Props {
  service: string;
  tags?: string[];
}

export default function ProfServiceTags({ service, tags = [] }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-lg text-sm font-medium">
        {service}
      </span>
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
