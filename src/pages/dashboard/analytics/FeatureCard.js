import Card from "../../../shared/components/Card";

export default function FeatureCard({ icon, subtitle, title }) {
  return (
    <Card className="bg-light-base2 dark:bg-dark-base2">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 mr-2 text-2xl rounded bg-light-base1 dark:bg-dark-base1">
          {icon}
        </div>
        <p className="text-sm text-slate-600 dark:text-gray-500">{subtitle}</p>
      </div>
      {title && (
        <h2 className="my-3 text-3xl font-semibold text-light-text1 dark:text-dark-text1">
          {title}
        </h2>
      )}
      {!title && (
        <div className="my-3 animate-pulse">
          <div className="w-1/3 h-8 mt-4 rounded bg-slate-300 dark:bg-slate-700" />
        </div>
      )}
    </Card>
  );
}
