﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JobNova.Core.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace JobNova.Core.Infrastructure;

public class JwtProvider: IJwtProvider
{
    private readonly JwtOptions _options = new JwtOptions();
    public string GenerateToken(IUserBase user)
    { 
        Claim[] claims =
        {
            new Claim(user.Role, "true"),
            new Claim("userId", user.Id.ToString())
        };
        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_options.SecretKey)), SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            claims: claims,
            signingCredentials: signingCredentials,
            expires: DateTime.UtcNow.AddHours(_options.ExpiresHours));

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

