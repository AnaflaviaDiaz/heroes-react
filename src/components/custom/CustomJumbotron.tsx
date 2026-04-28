interface CustomJumbotronProps {
  title?: string;
  subtitle?: string;
}

export const CustomJumbotron = ({ title, subtitle }: CustomJumbotronProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
