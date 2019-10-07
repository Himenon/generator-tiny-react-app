import * as React from "react";
import * as Counter from "../Counter/Counter";

interface ClassNames {
  counterPage?: string;
  heading?: string;
  counter?: string;
}

const styles: ClassNames = require("./counter_page.scss");

interface TemplateProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  counter: Counter.Props;
  heading: JSX.IntrinsicElements["h1"];
}

const CounterPage = ({ heading, counter, ...props }: TemplateProps) => {
  return (
    <div className={styles.counterPage} {...props}>
      <h1 className={styles.heading} {...heading} />
      <Counter.Component className={styles.counter} {...counter} />
    </div>
  );
};

export { TemplateProps as Props, CounterPage as Component };
