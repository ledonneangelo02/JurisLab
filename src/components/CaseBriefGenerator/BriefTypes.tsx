export interface Brief {
  caseName?: string;
  evidentiaryFacts?: string;
  proceduralFacts?: string;
  issue?: string;
  courtHolding?: string;
  ruleAppliedOrCreated?: string;
  courtReasoning?: string;
  judgment?: string;
  concurringOpinions?: string;
  dissentingOpinions?: string;
  [key: string]: string | undefined;
}
