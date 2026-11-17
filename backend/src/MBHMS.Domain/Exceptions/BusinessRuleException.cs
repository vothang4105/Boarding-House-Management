namespace MBHMS.Domain.Exceptions;

public class BusinessRuleException : DomainException
{
    public string? RuleCode { get; }

    public BusinessRuleException(string message) : base(message)
    {
    }

    public BusinessRuleException(string ruleCode, string message) : base(message)
    {
        RuleCode = ruleCode;
    }
}
