using JobNova.Core.Filters;
using Microsoft.AspNetCore.Mvc;

namespace JobNova.Core.Attributes;

public class AuthorizeMultiplePolicyAttribute:TypeFilterAttribute
{
    public AuthorizeMultiplePolicyAttribute(string policies,bool IsAll):base(typeof(AuthorizeMultiplePolicyFilter))
    {
        Arguments = new object[] { policies,IsAll};
    }
}