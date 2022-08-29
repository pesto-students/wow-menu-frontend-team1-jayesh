import Card from "../../../shared/components/Card";

export default function FeatureCard({ icon, subtitle, title }) {
  return (
    <Card className="bg-light-base2 dark:bg-dark-base2">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 mr-2 text-2xl rounded bg-light-base1 dark:bg-dark-base1">
          {icon}
        </div>
        <p className="text-sm text-light-text2 dark:text-dark-text2">
          {subtitle}
        </p>
      </div>
      <h2 className="my-3 text-3xl font-semibold text-light-text1 dark:text-dark-text1">
        {title}
      </h2>
    </Card>
  );
}
